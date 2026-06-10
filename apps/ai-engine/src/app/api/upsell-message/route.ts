import { NextRequest, NextResponse } from "next/server";
import { generateUpsellMessage } from "@/lib/gemini-client";

/**
 * POST /api/upsell-message
 * Generates a 30-day upsell message using Gemini.
 * Suggests complementary services based on the client's previous project.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, projectTitle, projectType } = body;

    if (!clientName || !projectTitle) {
      return NextResponse.json(
        { error: "Missing required fields: clientName, projectTitle" },
        { status: 400 }
      );
    }

    const message = await generateUpsellMessage({
      clientName,
      projectTitle,
      projectType: projectType || "GENERAL",
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("[UPSELL_MSG_ERROR]", error);
    return NextResponse.json({ error: "Failed to generate upsell message" }, { status: 500 });
  }
}
