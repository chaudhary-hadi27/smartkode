import { prisma } from "../client";

export async function getProjectsByStatus(status?: string) {
  return prisma.project.findMany({
    where: status ? { status: status as any } : undefined,
    include: {
      client: true,
      agency: true,
      tech_company: true,
      milestones: true,
    },
    orderBy: { created_at: "desc" },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      agency: true,
      tech_company: true,
      milestones: true,
      deliverables: true,
      invoices: true,
    },
  });
}
