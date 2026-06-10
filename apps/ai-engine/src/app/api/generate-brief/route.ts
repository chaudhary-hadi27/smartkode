import { NextRequest, NextResponse } from "next/server";
import { generateP1Brief } from "@/lib/groq-client";

/**
 * POST /api/generate-brief
 * Generates a P1 project brief from client + project info using Groq (LLaMA 3.3).
 * Called by the admin portal when a new project is created.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, type, totalValue, deadline } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields: title, description" },
        { status: 400 }
      );
    }

    const brief = await generateP1Brief({ title, description, type, totalValue, deadline });

    return NextResponse.json({ brief });
  } catch (error) {
    console.error("[GENERATE_BRIEF_ERROR]", error);
    return NextResponse.json({ error: "Failed to generate P1 brief" }, { status: 500 });
  }
}
