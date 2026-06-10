/**
 * SmartKode — Database Seed
 *
 * Seeds:
 *  1. Admin user (you — the SmartKode owner)
 *  2. Default ProfitSettings (10% agency, 40% tech, 50% admin)
 *
 * Run: pnpm --filter @smartkode/database exec prisma db seed
 */

import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting SmartKode database seed...\n");

  // ── 1. Admin User ────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@smartkode.co";
  const adminPassword = process.env.ADMIN_PASSWORD || "SmartKode@Admin2025!";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      role: Role.ADMIN,
      password_hash: passwordHash,
      is_active: true,
    },
  });

  console.log(`✅ Admin user created/verified: ${admin.email} (id: ${admin.id})`);

  // ── 2. Default ProfitSettings ────────────────────────────────────
  // Check if settings already exist
  const existingSettings = await prisma.profitSettings.findFirst();

  if (!existingSettings) {
    const settings = await prisma.profitSettings.create({
      data: {
        agency_default_percent: 10.0,  // Agency gets 10% finder fee
        tech_default_percent: 40.0,    // Tech team gets 40%
        admin_profit_percent: 50.0,    // You keep 50%
        updated_by: admin.id,
      },
    });
    console.log(`✅ ProfitSettings created:`);
    console.log(`   Agency: ${settings.agency_default_percent}%`);
    console.log(`   Tech:   ${settings.tech_default_percent}%`);
    console.log(`   Admin:  ${settings.admin_profit_percent}%`);
  } else {
    console.log(`ℹ️  ProfitSettings already exist — skipping.`);
  }

  // ── 3. Development: Seed sample data (only in dev) ───────────────
  if (process.env.NODE_ENV === "development" && process.env.SEED_SAMPLE_DATA === "true") {
    console.log("\n🧪 Seeding sample data for development...");

    // Sample Agency
    const agencyUser = await prisma.user.upsert({
      where: { email: "agency@demo.smartkode.co" },
      update: {},
      create: {
        email: "agency@demo.smartkode.co",
        role: Role.AGENCY,
        password_hash: await bcrypt.hash("Demo@Agency123!", 12),
        is_active: true,
      },
    });

    const agency = await prisma.agency.upsert({
      where: { user_id: agencyUser.id },
      update: {},
      create: {
        user_id: agencyUser.id,
        company_name: "Demo Agency Ltd",
        country: "Pakistan",
        commission_percent: 10.0,
      },
    });
    console.log(`✅ Sample agency: ${agency.company_name}`);

    // Sample Tech Company
    const techUser = await prisma.user.upsert({
      where: { email: "tech@demo.smartkode.co" },
      update: {},
      create: {
        email: "tech@demo.smartkode.co",
        role: Role.TECH,
        password_hash: await bcrypt.hash("Demo@Tech123!", 12),
        is_active: true,
      },
    });

    const tech = await prisma.techCompany.upsert({
      where: { user_id: techUser.id },
      update: {},
      create: {
        user_id: techUser.id,
        company_name: "Demo Dev Studio",
        specialization: "AI & Web Development",
        tech_cut_percent: 40.0,
        availability_status: "AVAILABLE",
      },
    });
    console.log(`✅ Sample tech company: ${tech.company_name}`);

    // Sample Client
    const clientUser = await prisma.user.upsert({
      where: { email: "client@demo.smartkode.co" },
      update: {},
      create: {
        email: "client@demo.smartkode.co",
        role: Role.CLIENT,
        password_hash: await bcrypt.hash("Demo@Client123!", 12),
        is_active: true,
      },
    });

    const client = await prisma.client.upsert({
      where: { user_id: clientUser.id },
      update: {},
      create: {
        user_id: clientUser.id,
        agency_id: agency.id,
        full_name: "John Demo Client",
        company_name: "Client Corp Ltd",
        country: "United Arab Emirates",
        client_type: "INTERNATIONAL",
        preferred_currency: "USD",
        preferred_payment: "WISE",
      },
    });
    console.log(`✅ Sample client: ${client.full_name}`);
  }

  console.log("\n🎉 Seed complete!");
  console.log(`\n📝 Admin login:\n   Email: ${adminEmail}\n   Password: ${adminPassword}`);
  console.log("\n⚠️  Change the admin password immediately after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
