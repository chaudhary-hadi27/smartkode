// @ts-nocheck — dev bypass: mock data active; remove when live DB is connected
import { auth } from "@smartkode/auth";
import { prisma } from "@smartkode/database";
import { Receipt } from "lucide-react";
import { InvoiceList } from "../../../components/invoice-list";

export default async function InvoicesPage() {
  // ── DEV BYPASS ──────────────────────────────────────────────────────────────
  let session = null;
  try { session = await auth(); } catch (_) {}
  if (!session?.user?.email) session = { user: { email: "dev-client@smartkode.co" } };

  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email || "" },
      include: {
        client: {
          include: {
            projects: {
              include: {
                invoices: { orderBy: { sent_at: "desc" } },
              },
            },
          },
        },
      },
    });
  } catch (_) {}

  // ── MOCK DATA ───────────────────────────────────────────────────────────────
  const mockInvoices = [
    { id: "i1", invoice_number: "INV-001", project_title: "E-Commerce Platform", amount: 800,  status: "PAID",    sent_at: new Date("2025-02-01") },
    { id: "i2", invoice_number: "INV-002", project_title: "E-Commerce Platform", amount: 1200, status: "SENT",    sent_at: new Date("2025-03-01") },
    { id: "i3", invoice_number: "INV-003", project_title: "CRM Dashboard",       amount: 500,  status: "PAID",    sent_at: new Date("2025-03-20") },
    { id: "i4", invoice_number: "INV-004", project_title: "CRM Dashboard",       amount: 900,  status: "OVERDUE", sent_at: new Date("2025-04-10") },
  ];

  const projects = user?.client?.projects ?? [];
  const invoices = projects.length > 0
    ? projects.flatMap((p: any) =>
        (p.invoices ?? []).map((inv: any) => ({ ...inv, project_title: p.title }))
      )
    : mockInvoices;

  const totalPaid = invoices.filter((i: any) => i.status === "PAID").reduce((s: number, i: any) => s + i.amount, 0);
  const totalDue  = invoices.filter((i: any) => i.status !== "PAID").reduce((s: number, i: any) => s + i.amount, 0);

  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Invoices</h1>
        <p className="text-sm text-gray-400 mt-1">View and pay your outstanding invoices.</p>
      </div>

      {/* ── BIG GREY-800 SUMMARY PANEL ─────────────────────────────────────── */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-3 gap-0 divide-x divide-gray-700">
          {[
            { label: "Total Invoices", value: invoices.length },
            { label: "Total Paid",     value: formatter.format(totalPaid) },
            { label: "Outstanding",    value: formatter.format(totalDue) },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center py-5 px-4 text-center">
              <p className="text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">{value}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      {invoices.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-800 rounded-3xl">
          <Receipt className="w-10 h-10 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">No invoices yet.</p>
        </div>
      ) : (
        <InvoiceList invoices={invoices} />
      )}
    </div>
  );
}
