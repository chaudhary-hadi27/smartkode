"use server";

import { prisma } from "@smartkode/database";
import { revalidatePath } from "next/cache";

export async function approveAgency(agencyId: string) {
  await prisma.$transaction([
    prisma.agency.update({
      where: { id: agencyId },
      data: { is_active: true },
    }),
    prisma.user.updateMany({
      where: { agency: { id: agencyId } },
      data: { is_active: true },
    }),
  ]);
  revalidatePath("/agencies");
  revalidatePath("/overview");
}

export async function rejectAgency(agencyId: string) {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { user_id: true },
  });
  if (!agency) return;

  await prisma.$transaction([
    prisma.agency.delete({ where: { id: agencyId } }),
    prisma.user.delete({ where: { id: agency.user_id } }),
  ]);
  revalidatePath("/agencies");
}
