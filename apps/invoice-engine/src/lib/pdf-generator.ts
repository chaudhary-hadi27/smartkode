import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientCompany?: string;
  projectTitle: string;
  amount: number;
  currency: string;
  agencyShare: number;
  techShare: number;
  adminShare: number;
  paymentMethod: string;
  dueDate?: string;
  issuedDate: string;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const black = rgb(0.04, 0.04, 0.04);
  const gray = rgb(0.5, 0.5, 0.5);
  const accent = rgb(0.13, 0.51, 0.96); // SmartKode blue

  let y = 780;

  // Header
  page.drawText("SmartKode", { x: 50, y, font: fontBold, size: 24, color: accent });
  page.drawText("INVOICE", { x: 430, y, font: fontBold, size: 18, color: black });
  y -= 30;

  page.drawText(`Invoice #: ${data.invoiceNumber}`, { x: 430, y, font, size: 10, color: gray });
  y -= 15;
  page.drawText(`Date: ${data.issuedDate}`, { x: 430, y, font, size: 10, color: gray });
  if (data.dueDate) {
    y -= 15;
    page.drawText(`Due: ${data.dueDate}`, { x: 430, y, font, size: 10, color: gray });
  }

  // Client info
  y = 700;
  page.drawText("Bill To:", { x: 50, y, font: fontBold, size: 11, color: gray });
  y -= 18;
  page.drawText(data.clientName, { x: 50, y, font: fontBold, size: 13, color: black });
  if (data.clientCompany) {
    y -= 16;
    page.drawText(data.clientCompany, { x: 50, y, font, size: 11, color: gray });
  }

  // Project
  y -= 40;
  page.drawText("Project:", { x: 50, y, font: fontBold, size: 11, color: gray });
  y -= 18;
  page.drawText(data.projectTitle, { x: 50, y, font, size: 12, color: black });

  // Line separator
  y -= 30;
  page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });

  // Amount table
  y -= 30;
  page.drawText("Description", { x: 50, y, font: fontBold, size: 10, color: gray });
  page.drawText("Amount", { x: 450, y, font: fontBold, size: 10, color: gray });
  y -= 20;
  page.drawText(data.projectTitle, { x: 50, y, font, size: 11, color: black });
  page.drawText(`${data.currency} ${data.amount.toLocaleString()}`, { x: 450, y, font, size: 11, color: black });

  // Total
  y -= 30;
  page.drawLine({ start: { x: 350, y: y + 10 }, end: { x: 545, y: y + 10 }, thickness: 1, color: rgb(0.85, 0.85, 0.85) });
  page.drawText("Total Due:", { x: 370, y, font: fontBold, size: 13, color: black });
  page.drawText(`${data.currency} ${data.amount.toLocaleString()}`, { x: 450, y, font: fontBold, size: 13, color: accent });

  // Payment method
  y -= 40;
  page.drawText(`Payment Method: ${data.paymentMethod}`, { x: 50, y, font, size: 10, color: gray });

  // Footer
  page.drawText("Thank you for choosing SmartKode.", { x: 50, y: 60, font, size: 10, color: gray });
  page.drawText("smartkode.co", { x: 50, y: 45, font, size: 9, color: accent });

  return await doc.save();
}
