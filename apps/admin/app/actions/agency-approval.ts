"use server";

import { prisma } from "@smartkode/database";
import { revalidatePath } from "next/cache";

export async function approveAgency(agencyId: string) {
  await prisma.$transaction([
    prisma.agency.update({
      where: { id: agencyId },
      data: { is_active: true, is_rejected: false },
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
  // Mark as rejected — data is preserved for records, portal access is blocked
  await prisma.$transaction([
    prisma.agency.update({
      where: { id: agencyId },
      data: { is_active: false, is_rejected: true },
    }),
    prisma.user.updateMany({
      where: { agency: { id: agencyId } },
      data: { is_active: false },
    }),
  ]);
  revalidatePath("/agencies");
  revalidatePath("/overview");
}
