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

      <div className="grid grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Payment</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-blue-400">${totalPending.toLocaleString()}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-red-400">${totalOverdue.toLocaleString()}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Your Net Profit</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-amber-500">${totalAdminCut.toLocaleString()}</p></CardContent></Card>
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
