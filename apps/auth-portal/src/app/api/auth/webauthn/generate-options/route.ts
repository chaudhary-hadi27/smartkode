import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartauth/database";
import { generateAuthenticationOptions } from "@simplewebauthn/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { passkey_credentials: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!user.passkey_credentials.length) {
      return NextResponse.json({ error: "No passkeys registered for this account" }, { status: 400 });
    }

    const options = await generateAuthenticationOptions({
      rpID: process.env.WEBAUTHN_RP_ID || "localhost",
      allowCredentials: user.passkey_credentials.map((c) => ({
        id: c.credential_id,
        type: "public-key" as const,
      })),
      userVerification: "preferred",
    });

    return NextResponse.json(options);
  } catch (err) {
    console.error("[WebAuthn GenerateOptions]", err);
    return NextResponse.json({ error: "Failed to generate options" }, { status: 500 });
  }
}
