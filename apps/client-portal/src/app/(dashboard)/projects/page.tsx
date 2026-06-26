// @ts-nocheck — dev bypass: mock data active; remove when live DB is connected
import { auth } from "@smartkode/auth";
import { prisma } from "@smartkode/database";
import { FolderKanban, CheckCircle, Clock, AlertCircle, ChevronDown } from "lucide-react";

export default async function ProjectsPage() {
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
                milestones: { orderBy: { created_at: "asc" } },
                invoices:   { orderBy: { sent_at: "desc" }  },
              },
              orderBy: { created_at: "desc" },
            },
          },
        },
      },
    });
  } catch (_) {}

  // ── MOCK DATA ───────────────────────────────────────────────────────────────
  if (!user?.client) {
    user = {
      client: {
        projects: [
          {
            id: "mock-1",
            title: "E-Commerce Platform",
            status: "IN_DEV",
            brief: "Full-stack e-commerce solution with custom product catalog, Stripe payments, and admin panel.\n\nScope:\n- Product listing & search\n- Cart & checkout flow\n- Order management\n- Admin dashboard",
            created_at: new Date("2025-01-10"),
            milestones: [
              { id: "m1", title: "UI/UX Design",    status: "PAID",    amount: 800,  due_date: "2025-02-01" },
              { id: "m2", title: "Backend API",     status: "INVOICED", amount: 1200, due_date: "2025-03-01" },
              { id: "m3", title: "QA & Deployment", status: "PENDING", amount: 600,  due_date: "2025-04-01" },
            ],
          },
          {
            id: "mock-2",
            title: "CRM Dashboard",
            status: "QA",
            brief: "Internal CRM for tracking leads, clients, and sales pipeline.\n\nScope:\n- Lead management\n- Client profiles\n- Sales funnel\n- Reporting",
            created_at: new Date("2025-03-05"),
            milestones: [
              { id: "m4", title: "Design Phase",  status: "PAID",    amount: 500, due_date: "2025-03-20" },
              { id: "m5", title: "Development",   status: "INVOICED", amount: 900, due_date: "2025-04-15" },
            ],
          },
        ],
      },
    } as any;
  }

  const projects = user.client.projects ?? [];

  const STATUS_LABEL: Record<string, string> = {
    INTAKE: "Intake", ASSIGNED: "Assigned", IN_DEV: "In Dev",
    QA: "QA", DELIVERED: "Delivered", APPROVED: "Approved", CLOSED: "Closed",
  };
  const STATUS_COLOR: Record<string, string> = {
    INTAKE:    "bg-gray-500/20 text-gray-400 border-gray-500/30",
    ASSIGNED:  "bg-blue-500/20 text-blue-400 border-blue-500/30",
    IN_DEV:    "bg-purple-500/20 text-purple-400 border-purple-500/30",
    QA:        "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELIVERED: "bg-green-500/20 text-green-400 border-green-500/30",
    APPROVED:  "bg-green-500/20 text-green-400 border-green-500/30",
    CLOSED:    "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const MILESTONE_COLOR: Record<string, string> = {
    PENDING:  "bg-gray-500/20 text-gray-400",
    INVOICED: "bg-amber-500/20 text-amber-400",
    PAID:     "bg-green-500/20 text-green-400",
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Your Projects</h1>
        <p className="text-sm text-gray-400 mt-1">Track progress, view briefs, and monitor milestones.</p>
      </div>

      {/* ── BIG GREY-800 SUMMARY PANEL ─────────────────────────────────────── */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-3 gap-0 divide-x divide-gray-700">
          {[
            { label: "Total Projects",  value: projects.length },
            { label: "Active",          value: projects.filter((p: any) => !["DELIVERED","APPROVED","CLOSED"].includes(p.status)).length },
            { label: "Completed",       value: projects.filter((p: any) => ["DELIVERED","APPROVED","CLOSED"].includes(p.status)).length },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center py-5 px-4 text-center">
              <p className="text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">{value}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      {projects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-800 rounded-3xl">
          <FolderKanban className="w-10 h-10 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">No projects yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project: any) => {
            const milestones = project.milestones ?? [];
            const paidCount = milestones.filter((m: any) => m.status === "PAID").length;
            const progressPct = milestones.length > 0
              ? Math.round((paidCount / milestones.length) * 100)
              : 0;

            return (
              <div key={project.id} className="rounded-3xl border border-gray-800 bg-white/[0.01] overflow-hidden">
                {/* Project Header */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                      <FolderKanban className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{project.title}</h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Started {new Date(project.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR[project.status] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-500">Milestone Progress</span>
                    <span className="text-xs font-bold text-white">{progressPct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Project Brief */}
                {project.brief && (
                  <div className="mx-6 mb-4 p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Project Brief</p>
                    <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{project.brief}</p>
                  </div>
                )}

                {/* Milestones */}
                {milestones.length > 0 && (
                  <div className="px-6 pb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Milestones</p>
                    <div className="space-y-2">
                      {milestones.map((m: any) => (
                        <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gray-800/50">
                          <div className="flex items-center gap-2.5">
                            {m.status === "PAID" ? (
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                            ) : m.status === "INVOICED" ? (
                              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-600 shrink-0" />
                            )}
                            <span className="text-sm text-white font-medium">{m.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">{formatter.format(m.amount)}</span>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${MILESTONE_COLOR[m.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                              {m.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
