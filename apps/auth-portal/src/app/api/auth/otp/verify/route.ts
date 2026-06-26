import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartauth/database";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        user_id: user.id,
        code,
        used: false,
        expires_at: { gt: new Date() },
      },
      orderBy: { created_at: "desc" },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    // Mark code as used
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[OTP Verify]", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
