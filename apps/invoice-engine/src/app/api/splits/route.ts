import { NextRequest, NextResponse } from "next/server";
import { calculateSplits } from "@/lib/splits-calculator";

/**
 * POST /api/splits
 * Calculates the financial split for a project or milestone.
 * Used by the admin portal when creating a project or marking a milestone.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { totalAmount, agencyPercent, techPercent, isDirect } = body;

    if (totalAmount === undefined || agencyPercent === undefined || techPercent === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: totalAmount, agencyPercent, techPercent" },
        { status: 400 }
      );
    }

    const result = calculateSplits({
      totalAmount,
      agencyPercent,
      techPercent,
      isDirect: isDirect || false,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[SPLITS_ERROR]", error);
    return NextResponse.json({ error: "Failed to calculate splits" }, { status: 500 });
  }
}
