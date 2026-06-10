import { NextRequest, NextResponse } from "next/server";
import { verifyAuthenticationResponse, verifyRegistrationResponse } from "@simplewebauthn/server";
import { prisma } from "@smartkode/database";

const challengeStore = global as unknown as { webauthnChallenges?: Record<string, string> };

export async function POST(req: NextRequest) {
  try {
    const { email, action = "authenticate", response } = await req.json();

    if (!email || !response) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, is_active: true, passkey_credential: true },
    });

    if (!user || !user.is_active) {
      return NextResponse.json({ error: "User not found or pending approval" }, { status: 404 });
    }

    const expectedChallenge = challengeStore.webauthnChallenges?.[user.id];
    if (!expectedChallenge) {
      return NextResponse.json({ error: "Challenge not found or expired. Try again." }, { status: 400 });
    }

    const expectedOrigin = [
      "http://localhost:3002",
      "https://agency.smartkode.co",
      "http://localhost:3000" // For testing across ports
    ];
    const expectedRPID = req.nextUrl.hostname;

    if (action === "register") {
      const verification = await verifyRegistrationResponse({
        response,
        expectedChallenge,
        expectedOrigin,
        expectedRPID,
      });

      if (verification.verified && verification.registrationInfo) {
        const { credential } = verification.registrationInfo;

        // Convert Uint8Arrays to base64 strings or hex for JSON storage
        const passkeyData = {
          id: Buffer.from(credential.id).toString("base64url"),
          publicKey: Buffer.from(credential.publicKey).toString("base64url"),
          counter: 0,
        };

        await prisma.user.update({
          where: { id: user.id },
          data: { passkey_credential: passkeyData },
        });

        delete challengeStore.webauthnChallenges![user.id];
        return NextResponse.json({ verified: true, message: "Passkey registered successfully" });
      }
    } else {
      if (!user.passkey_credential) {
        return NextResponse.json({ error: "No passkey registered" }, { status: 400 });
      }

      const passkeyData = user.passkey_credential as any;
      const credentialID = Buffer.from(passkeyData.id, "base64url");
      const credentialPublicKey = Buffer.from(passkeyData.publicKey, "base64url");

      const verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge,
        expectedOrigin,
        expectedRPID,
        credential: {
          id: passkeyData.id,
          publicKey: credentialPublicKey,
          counter: passkeyData.counter || 0,
        },
      });

      if (verification.verified) {
        delete challengeStore.webauthnChallenges![user.id];
        return NextResponse.json({ verified: true, userId: user.id });
      }
    }

    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  } catch (err: any) {
    console.error("[WEBAUTHN VERIFY]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
