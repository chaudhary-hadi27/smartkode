import { prisma } from "@smartkode/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@smartkode/ui";

const STATUS_COLORS: Record<string, string> = {
  INTAKE:    "bg-slate-500/10   text-slate-400   border-slate-500/20",
  ASSIGNED:  "bg-blue-500/10    text-blue-400    border-blue-500/20",
  IN_DEV:    "bg-amber-500/10   text-amber-400   border-amber-500/20",
  QA:        "bg-purple-500/10  text-purple-400  border-purple-500/20",
  DELIVERED: "bg-teal-500/10    text-teal-400    border-teal-500/20",
  APPROVED:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CLOSED:    "bg-gray-500/10    text-gray-400    border-gray-500/20",
};

const TYPE_COLOR: Record<string, string> = {
  LARGE: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  SMALL: "bg-blue-500/10   text-blue-400   border-blue-500/20",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      client:       { select: { full_name: true, company_name: true } },
      agency:       { select: { company_name: true } },
      tech_company: { select: { company_name: true } },
      milestones:   { select: { status: true } },
    },
    orderBy: { created_at: "desc" },
  });

  // Pipeline stage counts
  const stages = ["INTAKE","ASSIGNED","IN_DEV","QA","DELIVERED","APPROVED","CLOSED"] as const;
  const stageCounts = stages.reduce((acc, s) => {
    acc[s] = projects.filter(p => p.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Full lifecycle view of every project in the system.
          </p>
        </div>
      </div>

      {/* Stage Summary Strip */}
      <div className="grid grid-cols-7 gap-2">
        {stages.map((stage) => (
          <Card key={stage} className="text-center py-4 px-2">
            <p className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold mb-2 ${STATUS_COLORS[stage]}`}>
              {stage}
            </p>
            <p className="text-2xl font-bold">{stageCounts[stage]}</p>
          </Card>
        ))}
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Sorted by creation date — newest first.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Tech</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Admin Cut</TableHead>
                <TableHead className="text-right">Milestones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    No projects yet. They will appear when an agency submits a client.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((p) => {
                  const paidMilestones = p.milestones.filter(m => m.status === "PAID").length;
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium max-w-[180px] truncate">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.client.company_name || p.client.full_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.agency?.company_name ?? <span className="text-slate-600">Direct</span>}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.tech_company?.company_name ?? <span className="text-slate-600">Unassigned</span>}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TYPE_COLOR[p.type]}`}>
                          {p.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[p.status]}`}>
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${p.total_value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold text-amber-500">
                        ${p.admin_profit.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {paidMilestones}/{p.milestones.length}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
