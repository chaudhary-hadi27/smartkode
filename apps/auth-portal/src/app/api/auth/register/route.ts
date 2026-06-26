import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartauth/database";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    // Check for duplicate
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Create user (inactive until email verified)
    const user = await prisma.user.create({
      data: { name, email, password_hash, is_active: false },
    });

    // Generate and send verification OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpCode.create({
      data: { user_id: user.id, code, expires_at },
    });

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"SmartAuth" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Verify your email: ${code}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 400px; margin: 0 auto; background: #000; color: #fff; padding: 32px; border-radius: 16px;">
          <h2 style="font-size: 24px; font-weight: 800; margin: 0 0 8px;">Welcome to SmartAuth, ${name}!</h2>
          <p style="color: #9ca3af; margin: 0 0 24px; font-size: 14px;">Enter this code to verify your email address. Expires in 10 minutes.</p>
          <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 40px; font-weight: 900; letter-spacing: 0.3em; font-family: monospace; color: #fff;">${code}</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("[Register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
