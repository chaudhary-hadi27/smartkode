import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fullName, email, position, experience, portfolio, message, token } = await req.json();

  // Verify reCAPTCHA
  const captchaVerify = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: "POST" }
  );

  const captchaResult = await captchaVerify.json();

  if (!captchaResult.success) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Email to SmartKode
    await transporter.sendMail({
      from: `"SmartKode Careers" <${process.env.EMAIL_USER}>`,
      to: "careers@smartkode.io",
      subject: `New Career Application - ${position} from ${fullName}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
    });

    // Confirmation email to applicant
    await transporter.sendMail({
      from: `"SmartKode Careers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Application Has Been Received - SmartKode",
      html: `
        <h2>Thank you for applying to SmartKode!</h2>
        <p>Hi ${fullName},</p>
        <p>We've received your application for the <strong>${position}</strong> position.</p>
        <p>Our team will review your application and get back to you within 3-5 business days.</p>
        <p>In the meantime, feel free to check out our projects on GitHub or visit our website.</p>
        <p>Best regards,<br/>SmartKode Team</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}