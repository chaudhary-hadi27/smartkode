import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartkode/database";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { company_name, email, country, phone, password, otp } = await req.json();

    if (!company_name || !email || !password || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify OTP first
    const verification = await prisma.oTPVerification.findUnique({ where: { email } });

    if (!verification || verification.code !== otp || verification.expires_at < new Date()) {
      return NextResponse.json({ error: "Invalid or expired OTP. Please go back and request a new code." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
    }

    const settings = await prisma.profitSettings.findFirst();
    const defaultCommission = settings?.agency_default_percent ?? 10;
    const password_hash = await bcrypt.hash(password, 12);

    await prisma.$transaction(async (tx) => {
      await tx.oTPVerification.delete({ where: { email } });

      const user = await tx.user.create({
        data: { email, role: "AGENCY", password_hash, is_active: false },
      });

      await tx.agency.create({
        data: {
          user_id: user.id,
          company_name,
          country: country || null,
          phone: phone || null,
          commission_percent: defaultCommission,
          is_active: false,
        },
      });
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error("[AGENCY REGISTER]", err?.message);
    return NextResponse.json({ error: err?.message ?? "Internal server error" }, { status: 500 });
  }
}
