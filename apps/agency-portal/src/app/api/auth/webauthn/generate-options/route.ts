import { NextRequest, NextResponse } from "next/server";
import { generateAuthenticationOptions, generateRegistrationOptions } from "@simplewebauthn/server";
import { prisma } from "@smartkode/database";

// In-memory challenge store for development/demo purposes
// In production, use Redis or a DB table
const challengeStore = global as unknown as { webauthnChallenges?: Record<string, string> };
if (!challengeStore.webauthnChallenges) {
  challengeStore.webauthnChallenges = {};
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")?.toLowerCase();
    const action = req.nextUrl.searchParams.get("action") || "authenticate"; // "register" or "authenticate"

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, is_active: true, passkey_credential: true },
    });

    if (!user || !user.is_active) {
      return NextResponse.json({ error: "User not found or pending approval" }, { status: 404 });
    }

    const rpName = "SmartKode Agency Portal";
    const rpID = req.nextUrl.hostname; // e.g. "localhost" or "agency.smartkode.co"

    if (action === "register") {
      // Generate registration options
      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: new TextEncoder().encode(user.id),
        userName: user.email,
        attestationType: "none",
        authenticatorSelection: {
          residentKey: "preferred",
          userVerification: "preferred",
        },
      });

      challengeStore.webauthnChallenges![user.id] = options.challenge;
      return NextResponse.json(options);
    } else {
      // Generate authentication options
      if (!user.passkey_credential) {
        return NextResponse.json({ error: "No passkey registered for this account" }, { status: 400 });
      }

      const options = await generateAuthenticationOptions({
        rpID,
        userVerification: "preferred",
      });

      challengeStore.webauthnChallenges![user.id] = options.challenge;
      return NextResponse.json(options);
    }
  } catch (err: any) {
    console.error("[WEBAUTHN OPTIONS]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
