import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";

const PAY_STATUS_COLOR: Record<string, string> = {
  PENDING:   "bg-amber-500/10  text-amber-400  border-amber-500/20",
  CONFIRMED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  FAILED:    "bg-red-500/10    text-red-400    border-red-500/20",
  REFUNDED:  "bg-slate-500/10  text-slate-400  border-slate-500/20",
};

export default async function PaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      invoice: {
        select: {
          invoice_number: true,
          amount: true,
          project: { select: { title: true } },
        },
      },
      payer: { select: { email: true, role: true } },
    },
    orderBy: { confirmed_at: "desc" },
  });

  const confirmed = payments.filter(p => p.status === "CONFIRMED");
  const totalConfirmed = confirmed.reduce((a, p) => a + p.amount_paid, 0);
  const totalPending   = payments.filter(p => p.status === "PENDING").reduce((a, p) => a + p.amount_paid, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Records</h1>
        <p className="text-muted-foreground mt-1">
          All client payment submissions across every method.
        </p>
      </div>

      {/* Payment Stats - Big curved rectangle in grey-800 (sidebar hover match) */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-700">

          <div className="flex flex-col space-y-1 first:pt-0 pt-4 sm:pt-0 sm:px-6 first:pl-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Confirmed</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalConfirmed.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Successfully collected revenue</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 sm:pt-0 sm:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Awaiting Confirmation</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalPending.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Payments pending review</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 sm:pt-0 sm:px-6 last:pr-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Transactions</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{payments.length}</span>
            <p className="text-xs text-zinc-500 font-medium">All payment submissions</p>
          </div>

        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>Sensitive fields (IBAN, mobile) are encrypted in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Amount Paid</TableHead>
                <TableHead className="text-right">PKR Equiv.</TableHead>
                <TableHead>Tx Ref</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confirmed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    No payments recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs text-amber-400">
                      {p.invoice.invoice_number}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{p.payer.email}</TableCell>
                    <TableCell className="text-xs font-medium">{p.method}</TableCell>
                    <TableCell className="font-bold text-xs text-teal-400">{p.currency_paid}</TableCell>
                    <TableCell className="text-right font-medium">${p.amount_paid.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {p.amount_pkr_equiv ? `₨${p.amount_pkr_equiv.toLocaleString()}` : "—"}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {p.transaction_ref || "—"}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${PAY_STATUS_COLOR[p.status]}`}>
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.confirmed_at ? new Date(p.confirmed_at).toLocaleDateString() : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
