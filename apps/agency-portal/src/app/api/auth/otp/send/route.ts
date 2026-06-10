import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartkode/database";

export async function POST(req: NextRequest) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email = body?.email;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // delete-then-create (pgbouncer-safe)
    await prisma.oTPVerification.deleteMany({ where: { email } });
    await prisma.oTPVerification.create({ data: { email, code, expires_at } });

    // ═══ CHECK TERMINAL OUTPUT FOR OTP CODE ═══
    console.log(`\n╔══════════════════════════════════════╗`);
    console.log(`║  📧 OTP sent to: ${email}`);
    console.log(`║  🔑 Code: ${code}`);
    console.log(`║  ⏰ Expires in 10 minutes`);
    console.log(`╚══════════════════════════════════════╝\n`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[OTP SEND ERROR]", error?.message, error?.code);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
