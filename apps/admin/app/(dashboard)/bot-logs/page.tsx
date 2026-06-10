import { prisma } from "@smartkode/database";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@smartkode/ui";

const QA_COLOR: Record<string, string> = {
  PENDING: "bg-amber-500/10  text-amber-400  border-amber-500/20",
  PASS:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  FAIL:    "bg-red-500/10    text-red-400    border-red-500/20",
};

const SCAN_COLOR: Record<string, string> = {
  PENDING:  "bg-slate-500/10  text-slate-400  border-slate-500/20",
  CLEAN:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INFECTED: "bg-red-500/10    text-red-400    border-red-500/20",
};

export default async function BotLogsPage() {
  const deliverables = await prisma.deliverable.findMany({
    include: {
      project:  { select: { title: true } },
      uploader: { select: { email: true } },
    },
    orderBy: { uploaded_at: "desc" },
  });

  const totalFiles = deliverables.length;
  const clean      = deliverables.filter(d => d.virus_scan_status === "CLEAN").length;
  const infected   = deliverables.filter(d => d.virus_scan_status === "INFECTED").length;
  const qaPass     = deliverables.filter(d => d.bot_qa_status === "PASS").length;
  const qaFail     = deliverables.filter(d => d.bot_qa_status === "FAIL").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bot Logs & QA</h1>
        <p className="text-muted-foreground mt-1">
          VirusTotal scan results and AI QA bot verdicts for all uploaded deliverables.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Files",     value: totalFiles, color: "text-white"        },
          { label: "Virus: Clean",    value: clean,      color: "text-emerald-400"  },
          { label: "Virus: Infected", value: infected,   color: "text-red-400"      },
          { label: "QA: Pass",        value: qaPass,     color: "text-emerald-400"  },
          { label: "QA: Fail",        value: qaFail,     color: "text-red-400"      },
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
          <CardTitle>Deliverable Pipeline</CardTitle>
          <CardDescription>Files visible to client only when Virus=CLEAN and QA=PASS.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead className="text-right">Size (MB)</TableHead>
                <TableHead>Virus Scan</TableHead>
                <TableHead>QA Status</TableHead>
                <TableHead>Client Visible</TableHead>
                <TableHead>Uploaded At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliverables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No files uploaded yet.
                  </TableCell>
                </TableRow>
              ) : (
                deliverables.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-xs max-w-[160px] truncate">{d.file_name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-[120px] truncate">{d.project.title}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{d.uploader.email}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {d.file_size_mb ? `${d.file_size_mb.toFixed(1)} MB` : "—"}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SCAN_COLOR[d.virus_scan_status]}`}>
                        {d.virus_scan_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${QA_COLOR[d.bot_qa_status]}`}>
                        {d.bot_qa_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {d.visible_to_client
                        ? <span className="text-emerald-400 font-bold">✓ Yes</span>
                        : <span className="text-red-400">✗ No</span>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(d.uploaded_at).toLocaleDateString()}
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
