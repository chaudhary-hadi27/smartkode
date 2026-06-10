import { NextRequest, NextResponse } from "next/server";
import { qaCheckDeliverable } from "@/lib/groq-client";

/**
 * POST /api/qa-check
 * Checks a deliverable against the P1 brief using Groq QA Bot.
 * Called automatically when a tech team uploads a deliverable
 * (after virus scan returns CLEAN).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { p1Brief, deliverableDescription, fileName } = body;

    if (!p1Brief || !fileName) {
      return NextResponse.json(
        { error: "Missing required fields: p1Brief, fileName" },
        { status: 400 }
      );
    }

    const result = await qaCheckDeliverable(
      p1Brief,
      deliverableDescription || "No description provided",
      fileName
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("[QA_CHECK_ERROR]", error);
    return NextResponse.json({ error: "Failed to run QA check" }, { status: 500 });
  }
}
