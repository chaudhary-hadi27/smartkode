import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";
import { InviteButton } from "../../../components/invite-button";
import { EditCommissionButton } from "../../../components/edit-commission-button";

const AVAIL_COLOR: Record<string, string> = {
  AVAILABLE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BUSY:      "bg-amber-500/10   text-amber-400   border-amber-500/20",
  ON_LEAVE:  "bg-red-500/10     text-red-400     border-red-500/20",
};

export default async function TechPage() {
  const techs = await prisma.techCompany.findMany({
    include: {
      user:     { select: { email: true } },
      _count:   { select: { projects: true } },
    },
    orderBy: { joined_at: "desc" },
  });

  const available = techs.filter(t => t.availability_status === "AVAILABLE").length;
  const totalPaid  = techs.reduce((acc, t) => acc + t.total_paid, 0);
  const avgRating  = techs.length > 0
    ? (techs.reduce((acc, t) => acc + t.rating, 0) / techs.length).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Tech Companies</h1>
          <p className="text-gray-400 mt-1">
            Manage your delivery partners and their availability.
          </p>
        </div>
        <InviteButton type="Tech Company" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Teams</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{techs.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Available Now</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-emerald-400">{available}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Paid Out</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-blue-400">${totalPaid.toLocaleString()}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-amber-400">⭐ {avgRating}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tech Teams</CardTitle>
          <CardDescription>Delivery partners with their performance metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Cut %</TableHead>
                <TableHead className="text-right">Projects Done</TableHead>
                <TableHead className="text-right">Total Paid</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {techs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No tech companies registered yet.
                  </TableCell>
                </TableRow>
              ) : (
                techs.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.company_name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">{t.user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{t.specialization || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${AVAIL_COLOR[t.availability_status]}`}>
                        {t.availability_status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-400 flex items-center justify-end">
                      {t.tech_cut_percent}%
                      <EditCommissionButton id={t.id} type="tech" currentPct={t.tech_cut_percent} />
                    </TableCell>
                    <TableCell className="text-right">{t.total_projects_done}</TableCell>
                    <TableCell className="text-right font-medium text-emerald-400">${t.total_paid.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{t.rating > 0 ? `⭐ ${t.rating.toFixed(1)}` : "—"}</TableCell>
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
