import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@smartauth/database";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";

export async function POST(req: NextRequest) {
  try {
    const { email, response } = await req.json();
    if (!email || !response) {
      return NextResponse.json({ error: "Email and response are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { passkey_credentials: true },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Find the matching credential
    const credential = user.passkey_credentials.find(
      (c) => c.credential_id === response.id
    );
    if (!credential) {
      return NextResponse.json({ error: "Passkey not registered for this account" }, { status: 400 });
    }

    // Verify the WebAuthn assertion
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: response.response?.clientDataJSON
        ? JSON.parse(Buffer.from(response.response.clientDataJSON, "base64url").toString()).challenge
        : "",
      expectedOrigin: process.env.WEBAUTHN_ORIGIN || "http://localhost:4000",
      expectedRPID: process.env.WEBAUTHN_RP_ID || "localhost",
      credential: {
        id: credential.credential_id,
        publicKey: Buffer.from(credential.public_key, "base64url"),
        counter: Number(credential.counter),
      },
    });

    if (!verification.verified) {
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    // Update the counter
    await prisma.passkeyCredential.update({
      where: { id: credential.id },
      data: { counter: BigInt(verification.authenticationInfo.newCounter) },
    });

    return NextResponse.json({ verified: true, userId: user.id });
  } catch (err) {
    console.error("[WebAuthn Verify]", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
