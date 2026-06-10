import { NextRequest, NextResponse } from "next/server";
import { generateInvoicePDF } from "@/lib/pdf-generator";

/**
 * POST /api/generate
 * Generates a PDF invoice from project + client data.
 * Called by the admin portal when a milestone is marked INVOICED
 * or when a SMALL project is delivered.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      invoiceNumber,
      clientName,
      clientCompany,
      projectTitle,
      amount,
      currency,
      agencyShare,
      techShare,
      adminShare,
      paymentMethod,
      dueDate,
      issuedDate,
    } = body;

    // Validate required fields
    if (!invoiceNumber || !clientName || !projectTitle || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields: invoiceNumber, clientName, projectTitle, amount, currency" },
        { status: 400 }
      );
    }

    const pdfBytes = await generateInvoicePDF({
      invoiceNumber,
      clientName,
      clientCompany,
      projectTitle,
      amount,
      currency,
      agencyShare: agencyShare || 0,
      techShare: techShare || 0,
      adminShare: adminShare || 0,
      paymentMethod: paymentMethod || "IBAN",
      dueDate,
      issuedDate: issuedDate || new Date().toISOString().split("T")[0],
    });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[INVOICE_GENERATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to generate invoice PDF" }, { status: 500 });
  }
}
