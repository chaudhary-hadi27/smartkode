import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";

const STATUS_COLOR: Record<string, string> = {
  DRAFT:   "bg-slate-500/10  text-slate-400  border-slate-500/20",
  SENT:    "bg-blue-500/10   text-blue-400   border-blue-500/20",
  PAID:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  OVERDUE: "bg-red-500/10    text-red-400    border-red-500/20",
};

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      project: {
        select: {
          title: true,
          client: { select: { full_name: true, company_name: true } },
        },
      },
    },
    orderBy: { sent_at: "desc" },
  });

  const totalRevenue  = invoices.filter(i => i.status === "PAID").reduce((a, i) => a + i.amount, 0);
  const totalPending  = invoices.filter(i => i.status === "SENT").reduce((a, i) => a + i.amount, 0);
  const totalOverdue  = invoices.filter(i => i.status === "OVERDUE").reduce((a, i) => a + i.amount, 0);
  const totalAdminCut = invoices.filter(i => i.status === "PAID").reduce((a, i) => a + i.admin_share, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoice Manager</h1>
        <p className="text-muted-foreground mt-1">
          Track all invoices and their automated profit splits.
        </p>
      </div>

      {/* Invoice Stats - Big curved rectangle in grey-800 (sidebar hover match) */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-700">

          <div className="flex flex-col space-y-1 first:pt-0 pt-4 lg:pt-0 lg:px-6 first:pl-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Collected</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalRevenue.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Paid invoices revenue</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 lg:pt-0 lg:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Pending Payment</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalPending.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Awaiting client payment</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 lg:pt-0 lg:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Overdue</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalOverdue.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Past due date invoices</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 lg:pt-0 lg:px-6 last:pr-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Your Net Profit</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalAdminCut.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Your 50% admin share</p>
          </div>

        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>Automatic 10/40/50 profit split applied to every invoice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Agency (10%)</TableHead>
                <TableHead className="text-right">Tech (40%)</TableHead>
                <TableHead className="text-right">Admin (50%)</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                    No invoices generated yet.
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs font-medium text-amber-400">
                      {inv.invoice_number}
                    </TableCell>
                    <TableCell className="max-w-[140px] truncate text-muted-foreground">
                      {inv.project.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {inv.project.client.company_name || inv.project.client.full_name}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[inv.status]}`}>
                        {inv.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-xs text-teal-400">{inv.currency}</TableCell>
                    <TableCell className="text-right font-medium">${inv.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-emerald-400">${inv.agency_share.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-blue-400">${inv.tech_share.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-amber-500">${inv.admin_share.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{inv.payment_method}</TableCell>
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
