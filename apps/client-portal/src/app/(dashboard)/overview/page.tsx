// @ts-nocheck — dev bypass: mock data active; remove when live DB is connected
import { auth } from "@smartkode/auth";
import { prisma } from "@smartkode/database";
import Link from "next/link";
import { FolderKanban, Receipt, DollarSign, Clock, ArrowUpRight, CheckCircle, Bell } from "lucide-react";

export default async function OverviewPage() {
  // ── DEV BYPASS ──────────────────────────────────────────────────────────────
  // Attempt real session + DB; fall back to rich mock data so UI works locally.
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
                milestones: { orderBy: { created_at: "desc" } },
                invoices:   { orderBy: { sent_at: "desc" }, take: 3 },
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
        full_name: "Hadi Chaudhary",
        company_name: "SmartKode Client",
        projects: [
          {
            id: "mock-1",
            title: "E-Commerce Platform",
            status: "IN_DEV",
            created_at: new Date("2025-01-10"),
            milestones: [
              { id: "m1", title: "UI Design",      status: "PAID",    amount: 800  },
              { id: "m2", title: "Backend API",    status: "INVOICED", amount: 1200 },
              { id: "m3", title: "QA & Launch",    status: "PENDING", amount: 600  },
            ],
            invoices: [
              { id: "i1", invoice_number: "INV-001", amount: 800,  status: "PAID" },
              { id: "i2", invoice_number: "INV-002", amount: 1200, status: "SENT" },
            ],
          },
          {
            id: "mock-2",
            title: "CRM Dashboard",
            status: "QA",
            created_at: new Date("2025-03-05"),
            milestones: [
              { id: "m4", title: "Design Phase",   status: "PAID",    amount: 500  },
              { id: "m5", title: "Development",    status: "INVOICED", amount: 900  },
            ],
            invoices: [
              { id: "i3", invoice_number: "INV-003", amount: 500, status: "PAID" },
            ],
          },
        ],
      },
    } as any;
  }

  const client   = user.client;
  const projects = client.projects ?? [];
  const allInvoices = projects.flatMap((p: any) => p.invoices ?? []);

  const activeProjects = projects.filter((p: any) =>
    !["DELIVERED", "APPROVED", "CLOSED", "CANCELLED"].includes(p.status)
  ).length;

  const totalPaid = allInvoices
    .filter((i: any) => i.status === "PAID")
    .reduce((sum: number, i: any) => sum + (i.amount ?? 0), 0);

  const pendingAmount = allInvoices
    .filter((i: any) => i.status === "SENT")
    .reduce((sum: number, i: any) => sum + (i.amount ?? 0), 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  });

  const stats = [
    { label: "Active Projects",  value: activeProjects,              icon: FolderKanban, color: "text-blue-400"   },
    { label: "Total Paid",       value: formatter.format(totalPaid), icon: DollarSign,   color: "text-green-400"  },
    { label: "Outstanding",      value: formatter.format(pendingAmount), icon: Clock,   color: "text-amber-400"  },
    { label: "Total Invoices",   value: allInvoices.length,          icon: Receipt,      color: "text-purple-400" },
  ];

  const STATUS_LABEL: Record<string, string> = {
    INTAKE: "Intake", ASSIGNED: "Assigned", IN_DEV: "In Dev",
    QA: "QA", DELIVERED: "Delivered", APPROVED: "Approved", CLOSED: "Closed",
  };
  const STATUS_COLOR: Record<string, string> = {
    INTAKE: "bg-gray-500/20 text-gray-400",
    ASSIGNED: "bg-blue-500/20 text-blue-400",
    IN_DEV: "bg-purple-500/20 text-purple-400",
    QA: "bg-amber-500/20 text-amber-400",
    DELIVERED: "bg-green-500/20 text-green-400",
    APPROVED: "bg-green-500/20 text-green-400",
    CLOSED: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Client Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, <span className="text-white font-semibold">{client.full_name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-white" />
          </button>
          <Link
            href="/projects"
            className="px-5 py-2 rounded-full bg-white hover:bg-gray-100 text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            View Projects
          </Link>
        </div>
      </div>

      {/* ── BIG GREY-800 METRICS PANEL ─────────────────────────────────────── */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-700">
          {stats.map(({ label, value, icon: Icon, color }, idx) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center py-5 px-4 text-center ${
                idx < 2 && "lg:border-b-0"
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${color}`} />
              <p className="text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                {value}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1 font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects + Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 rounded-3xl border border-gray-800 bg-black p-6 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white">Your Projects</h2>
            <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-gray-500 py-10 text-center border border-dashed border-gray-800 rounded-xl">
              No projects yet.
            </p>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 4).map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-800 bg-white/[0.02] hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                      <FolderKanban className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${STATUS_COLOR[p.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Invoices */}
        <div className="rounded-3xl border border-gray-800 bg-black p-6 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white">Invoices</h2>
            <Link href="/invoices" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {allInvoices.length === 0 ? (
            <p className="text-sm text-gray-500 py-10 text-center border border-dashed border-gray-800 rounded-xl">
              No invoices yet.
            </p>
          ) : (
            <div className="space-y-3">
              {allInvoices.slice(0, 4).map((inv: any) => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-800 bg-white/[0.02]">
                  <div>
                    <p className="text-sm font-semibold text-white">{inv.invoice_number}</p>
                    <p className="text-xs text-gray-500">{formatter.format(inv.amount)}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                    inv.status === "PAID"    ? "bg-green-500/10 text-green-400" :
                    inv.status === "SENT"    ? "bg-amber-500/10 text-amber-400" :
                    inv.status === "OVERDUE" ? "bg-red-500/10 text-red-400"     :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {inv.status === "PAID" && <CheckCircle className="w-3 h-3" />}
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
