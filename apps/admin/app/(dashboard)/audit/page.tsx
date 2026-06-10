import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";

export default async function AuditPage() {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: { select: { email: true, role: true } },
    },
    orderBy: { created_at: "desc" },
    take: 100,
  });

  const ENTITY_COLOR: Record<string, string> = {
    User:        "bg-blue-500/10   text-blue-400   border-blue-500/20",
    Project:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Invoice:     "bg-amber-500/10  text-amber-400  border-amber-500/20",
    Payment:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Agency:      "bg-teal-500/10   text-teal-400   border-teal-500/20",
    Client:      "bg-cyan-500/10   text-cyan-400   border-cyan-500/20",
    Deliverable: "bg-red-500/10    text-red-400    border-red-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground mt-1">
          Immutable record of every admin action in the system. Cannot be modified or deleted.
        </p>
      </div>

      <Card className="border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Live Audit Trail
          </CardTitle>
          <CardDescription>
            Showing last 100 entries. All times are in UTC.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Entity ID</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No audit events recorded yet. They appear when admin actions are performed.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {new Date(log.created_at).toISOString().replace("T", " ").slice(0, 19)}
                    </TableCell>
                    <TableCell className="text-xs">{log.user.email}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border-amber-500/20">
                        {log.user.role}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-xs text-white">{log.action}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ENTITY_COLOR[log.entity_type] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                        {log.entity_type}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.entity_id.slice(0, 8)}…
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {log.ip_address || "—"}
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
