import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartauth/database";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "No account found with this email" }, { status: 404 });

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Invalidate old codes
    await prisma.otpCode.updateMany({
      where: { user_id: user.id, used: false },
      data: { used: true },
    });

    // Store new code
    await prisma.otpCode.create({
      data: { user_id: user.id, code, expires_at },
    });

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SmartAuth" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Your verification code: ${code}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 400px; margin: 0 auto; background: #000; color: #fff; padding: 32px; border-radius: 16px;">
          <h2 style="font-size: 24px; font-weight: 800; margin: 0 0 8px;">Your verification code</h2>
          <p style="color: #9ca3af; margin: 0 0 24px; font-size: 14px;">Enter this code to continue. It expires in 10 minutes.</p>
          <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 40px; font-weight: 900; letter-spacing: 0.3em; font-family: monospace; color: #fff;">${code}</span>
          </div>
          <p style="color: #4b5563; font-size: 12px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[OTP Send]", err);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  }
}
