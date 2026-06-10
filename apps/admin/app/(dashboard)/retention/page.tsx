import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";

const RETENTION_COLOR: Record<string, string> = {
  FOLLOWUP_48H:  "bg-blue-500/10    text-blue-400    border-blue-500/20",
  FOLLOWUP_30D:  "bg-purple-500/10  text-purple-400  border-purple-500/20",
  UPSELL:        "bg-amber-500/10   text-amber-400   border-amber-500/20",
  TESTIMONIAL:   "bg-teal-500/10    text-teal-400    border-teal-500/20",
  REACTIVATION:  "bg-red-500/10     text-red-400     border-red-500/20",
};

const CHANNEL_COLOR: Record<string, string> = {
  EMAIL:    "bg-blue-500/10   text-blue-400   border-blue-500/20",
  WHATSAPP: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BOTH:     "bg-purple-500/10 text-purple-400  border-purple-500/20",
};

export default async function RetentionPage() {
  const logs = await prisma.retentionLog.findMany({
    include: {
      client:  { select: { full_name: true, company_name: true } },
      project: { select: { title: true } },
    },
    orderBy: { scheduled_at: "desc" },
  });

  const sent      = logs.filter(l => l.sent_at).length;
  const opened    = logs.filter(l => l.opened).length;
  const converted = logs.filter(l => l.converted_to_project).length;
  const openRate  = sent > 0 ? ((opened / sent) * 100).toFixed(1) : "0";
  const convRate  = sent > 0 ? ((converted / sent) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Retention Engine</h1>
        <p className="text-muted-foreground mt-1">
          AI-generated follow-up campaigns that turn past clients into repeat revenue.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Campaigns", value: logs.length,         color: "text-white"       },
          { label: "Sent",            value: sent,                color: "text-blue-400"    },
          { label: "Opened",          value: opened,              color: "text-amber-400"   },
          { label: "Open Rate",       value: `${openRate}%`,      color: "text-teal-400"    },
          { label: "Conversion Rate", value: `${convRate}%`,      color: "text-emerald-400" },
        ].map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retention Log</CardTitle>
          <CardDescription>All scheduled and sent retention messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Converted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No retention campaigns scheduled yet. They are auto-created when a project closes.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">
                      {l.client.company_name || l.client.full_name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-[120px] truncate">
                      {l.project.title}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${RETENTION_COLOR[l.type]}`}>
                        {l.type.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${CHANNEL_COLOR[l.channel]}`}>
                        {l.channel}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(l.scheduled_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {l.sent_at ? new Date(l.sent_at).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>
                      {l.opened ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {l.converted_to_project
                        ? <span className="text-amber-400 font-bold">🔄 Yes</span>
                        : <span className="text-muted-foreground">—</span>}
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
