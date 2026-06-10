import { NextRequest, NextResponse } from "next/server";

const EXCHANGE_API_BASE = "https://v6.exchangerate-api.com/v6";

/**
 * GET /api/convert-currency?from=USD&to=PKR&amount=500
 * Converts foreign currency to PKR equivalent using exchangerate-api.com.
 * Used to auto-fill Payment.amount_pkr_equiv in the database.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "USD";
    const to = searchParams.get("to") || "PKR";
    const amount = parseFloat(searchParams.get("amount") || "0");

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (!apiKey) {
      // Fallback: use a static approximate rate for development
      const fallbackRates: Record<string, number> = {
        USD: 280, EUR: 305, GBP: 355, USDT: 280, USDC: 280, BTC: 28000000,
      };
      const rate = fallbackRates[from.toUpperCase()] || 280;
      return NextResponse.json({
        from,
        to,
        amount,
        convertedAmount: Math.round(amount * rate * 100) / 100,
        rate,
        source: "fallback",
      });
    }

    const res = await fetch(`${EXCHANGE_API_BASE}/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await res.json();

    if (data.result !== "success") {
      return NextResponse.json({ error: "Exchange rate API error", details: data }, { status: 502 });
    }

    return NextResponse.json({
      from,
      to,
      amount,
      convertedAmount: Math.round(data.conversion_result * 100) / 100,
      rate: data.conversion_rate,
      source: "exchangerate-api",
    });
  } catch (error) {
    console.error("[CURRENCY_CONVERT_ERROR]", error);
    return NextResponse.json({ error: "Failed to convert currency" }, { status: 500 });
  }
}
