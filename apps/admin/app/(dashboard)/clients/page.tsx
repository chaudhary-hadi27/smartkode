import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";
import { InviteButton } from "../../../components/invite-button";

const CURRENCY_COLOR: Record<string, string> = {
  USD:  "text-green-400",
  PKR:  "text-emerald-400",
  EUR:  "text-blue-400",
  USDT: "text-teal-400",
  USDC: "text-cyan-400",
  BTC:  "text-orange-400",
};

const CLIENT_TYPE_COLOR: Record<string, string> = {
  LOCAL:         "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INTERNATIONAL: "bg-blue-500/10    text-blue-400    border-blue-500/20",
};

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      user:          { select: { email: true, created_at: true } },
      source_agency: { select: { company_name: true } },
      _count:        { select: { projects: true } },
    },
    orderBy: { created_at: "desc" },
  });

  const totalLTV = clients.reduce((acc, c) => acc + c.lifetime_value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Clients CRM</h1>
          <p className="text-gray-400 mt-1">
            Full client registry with lifetime value and project tracking.
          </p>
        </div>
        <InviteButton type="Client" defaultZeroAgency={true} />
      </div>

      {/* Summary Stats - Big curved rectangle in grey-800 (sidebar hover match) */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-700">

          <div className="flex flex-col space-y-1 first:pt-0 pt-4 sm:pt-0 sm:px-6 first:pl-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Clients</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{clients.length}</span>
            <p className="text-xs text-zinc-500 font-medium">All registered clients</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 sm:pt-0 sm:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">International</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
              {clients.filter(c => c.client_type === "INTERNATIONAL").length}
            </span>
            <p className="text-xs text-zinc-500 font-medium">Clients outside Pakistan</p>
          </div>

          <div className="flex flex-col space-y-1 pt-4 sm:pt-0 sm:px-6 last:pr-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Lifetime Value</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalLTV.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Aggregate client revenue</p>
          </div>

        </div>
      </div>

      {/* Client Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>Sensitive contact info is masked. Admin can reveal via the API.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Source Agency</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">LTV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No clients registered yet.
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.full_name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.company_name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">{c.user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${CLIENT_TYPE_COLOR[c.client_type]}`}>
                        {c.client_type}
                      </span>
                    </TableCell>
                    <TableCell className={`font-bold ${CURRENCY_COLOR[c.preferred_currency]}`}>
                      {c.preferred_currency}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.source_agency?.company_name ?? <span className="text-slate-600 text-xs">Direct</span>}
                    </TableCell>
                    <TableCell className="text-right">{c._count.projects}</TableCell>
                    <TableCell className="text-right font-bold text-amber-500">
                      ${c.lifetime_value.toLocaleString()}
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
