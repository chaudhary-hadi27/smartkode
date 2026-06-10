"use server";
import { prisma } from "@smartkode/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitClientLead(formData: FormData) {
  // Mock auth: grab first agency
  const agency = await prisma.agency.findFirst({ where: { is_active: true } });
  if (!agency) throw new Error("Agency not found");

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const budget = parseFloat(formData.get("budget") as string);
  const requirements = formData.get("requirements") as string;

  if (!fullName || !email) throw new Error("Missing required fields");

  // Create a dummy user for the client to satisfy schema constraints
  // In production, this would send an invite to Auth service.
  const dummyUser = await prisma.user.create({
    data: {
      email: email,
      // Random dummy pass, since we don't handle auth here yet
      password_hash: "pending_invite",
      role: "CLIENT"
    }
  });

  const client = await prisma.client.create({
    data: {
      user_id: dummyUser.id,
      full_name: fullName,
      company_name: company || null,
      agency_id: agency.id,
      preferred_currency: "USD",
      lifetime_value: 0
    }
  });

  // Automatically create a "P1 Brief" project pending admin review
  const project = await prisma.project.create({
    data: {
      client_id: client.id,
      title: `${company || fullName} - Project 1`,
      description: requirements || "Requirements pending AI generation",
      status: "INTAKE",
      type: "SMALL",
      total_value: budget || 0,
      tech_cut: 0,
      agency_cut: 0,
      admin_profit: 0,
      agency_percent_used: agency.commission_percent,
      tech_percent_used: 60
    }
  });

  // Increment the agency's total_clients_sent count
  await prisma.agency.update({
    where: { id: agency.id },
    data: { total_clients_sent: { increment: 1 } }
  });

  revalidatePath("/overview");
  revalidatePath("/projects");
  redirect("/projects");
}
