import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/send
 * Sends an invoice PDF to the client via email (Resend API).
 * Called after PDF generation — receives the PDF as base64 and client email.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clientEmail, clientName, invoiceNumber, pdfBase64 } = body;

    if (!clientEmail || !invoiceNumber || !pdfBase64) {
      return NextResponse.json(
        { error: "Missing required fields: clientEmail, invoiceNumber, pdfBase64" },
        { status: 400 }
      );
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    const { data, error } = await resend.emails.send({
      from: "SmartKode Billing <billing@smartkode.co>",
      to: [clientEmail],
      subject: `Invoice ${invoiceNumber} — SmartKode`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${clientName || "there"},</h2>
          <p>Please find attached your invoice <strong>${invoiceNumber}</strong>.</p>
          <p>You can also view and pay this invoice from your <a href="https://client.smartkode.co">client portal</a>.</p>
          <br/>
          <p>Best regards,<br/>SmartKode Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("[INVOICE_SEND_ERROR]", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error("[INVOICE_SEND_ERROR]", error);
    return NextResponse.json({ error: "Failed to send invoice email" }, { status: 500 });
  }
}
