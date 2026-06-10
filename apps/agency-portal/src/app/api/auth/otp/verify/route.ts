import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartkode/database";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const verification = await prisma.oTPVerification.findUnique({ where: { email } });

    if (!verification) {
      return NextResponse.json({ error: "No OTP found. Please request a new code." }, { status: 404 });
    }

    if (verification.expires_at < new Date()) {
      return NextResponse.json({ error: "OTP has expired. Please request a new code." }, { status: 400 });
    }

    if (verification.code !== code) {
      return NextResponse.json({ error: "Invalid verification code. Please try again." }, { status: 400 });
    }

    await prisma.oTPVerification.delete({ where: { email } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[OTP VERIFY ERROR]", error?.message);
    return NextResponse.json({ error: error?.message ?? "Internal server error" }, { status: 500 });
  }
}
