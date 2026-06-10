import { NextRequest, NextResponse } from "next/server";
import { generateRetentionMessage } from "@/lib/gemini-client";

/**
 * POST /api/retention-message
 * Generates a personalized retention follow-up message using Gemini.
 * Called by the retention scheduler (cron) when scheduled_at is reached.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, projectTitle, deliveredDate, type } = body;

    if (!clientName || !projectTitle || !type) {
      return NextResponse.json(
        { error: "Missing required fields: clientName, projectTitle, type" },
        { status: 400 }
      );
    }

    const message = await generateRetentionMessage({
      clientName,
      projectTitle,
      deliveredDate: deliveredDate || new Date().toISOString(),
      type,
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("[RETENTION_MSG_ERROR]", error);
    return NextResponse.json({ error: "Failed to generate retention message" }, { status: 500 });
  }
}
