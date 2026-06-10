"use server";
import { prisma } from "@smartkode/database";
import { revalidatePath } from "next/cache";

export async function updateAgencyCommission(agencyId: string, newCommission: number) {
  await prisma.agency.update({
    where: { id: agencyId },
    data: { commission_percent: newCommission }
  });
  revalidatePath("/agencies");
}

export async function updateTechCut(techId: string, newCut: number) {
  await prisma.techCompany.update({
    where: { id: techId },
    data: { tech_cut_percent: newCut }
  });
  revalidatePath("/tech");
}
