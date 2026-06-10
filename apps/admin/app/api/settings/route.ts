import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartkode/database";

export async function POST(req: NextRequest) {
  try {
    const { agency_percent, tech_percent } = await req.json();

    if (typeof agency_percent !== "number" || typeof tech_percent !== "number") {
      return NextResponse.json({ error: "Invalid values" }, { status: 400 });
    }

    const admin_percent = Math.round((100 - agency_percent - tech_percent) * 10) / 10;

    if (admin_percent < 0) {
      return NextResponse.json({ error: "Split cannot exceed 100%" }, { status: 400 });
    }

    // Get admin user
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    const existing = await prisma.profitSettings.findFirst({
      orderBy: { updated_at: "desc" },
    });

    if (existing) {
      await prisma.profitSettings.update({
        where: { id: existing.id },
        data: {
          agency_default_percent: agency_percent,
          tech_default_percent:   tech_percent,
          admin_profit_percent:   admin_percent,
          updated_by:             admin.id,
        },
      });
    } else {
      await prisma.profitSettings.create({
        data: {
          agency_default_percent: agency_percent,
          tech_default_percent:   tech_percent,
          admin_profit_percent:   admin_percent,
          updated_by:             admin.id,
        },
      });
    }

    return NextResponse.json({ success: true, admin_percent });
  } catch (err) {
    console.error("Settings update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const settings = await prisma.profitSettings.findFirst({
    orderBy: { updated_at: "desc" },
  });
  return NextResponse.json(settings);
}
