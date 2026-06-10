import { prisma } from "@smartkode/database";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
  BRIEFING:    { label: "Briefing",    dot: "bg-gray-500"  },
  DEVELOPMENT: { label: "Development", dot: "bg-gray-300"  },
  QA_TESTING:  { label: "QA Testing",  dot: "bg-gray-400"  },
  DELIVERED:   { label: "Delivered",   dot: "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" },
  CANCELLED:   { label: "Cancelled",   dot: "bg-gray-800"  },
};

export default async function ProjectsPage() {
  const agency = await prisma.agency.findFirst({ where: { is_active: true } });

  if (!agency) {
    return <div className="text-gray-400 text-sm">No active agency found.</div>;
  }

  const projects = await prisma.project.findMany({
    where: { client: { agency_id: agency.id } },
    include: { client: { select: { full_name: true, company_name: true } } },
    orderBy: { created_at: "desc" },
  });

  const active = projects.filter((p) => !["DELIVERED", "CANCELLED"].includes(p.status)).length;
  const delivered = projects.filter((p) => p.status === "DELIVERED").length;

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-10 text-white bg-black">
      {/* Header */}
      <div 
        className="relative w-full rounded-3xl border border-gray-800 bg-black p-8 md:p-12 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8"
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Project Tracking</h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Real-time status of all projects sourced by your agency. Commission is automatically credited when a project reaches the Delivered status.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-gray-200 text-black text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            New Lead
            <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Projects Sourced", value: projects.length },
          { label: "Currently Active",       value: active         },
          { label: "Successfully Delivered", value: delivered      },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl border border-gray-800 bg-black p-8">
            <p className="text-5xl font-extrabold text-white tabular-nums tracking-tight">{s.value}</p>
            <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl border border-gray-800 bg-black overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">All Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <p className="text-xl text-white font-bold">No projects found</p>
            <p className="text-base text-gray-500 max-w-sm text-center">You haven't submitted any leads yet. Start by submitting a lead to see your projects track here.</p>
          </div>
        ) : (
          <div>
            {/* Table Head */}
            <div className="grid grid-cols-[2fr_1fr_auto_auto] gap-8 px-8 py-4 border-b border-gray-800 bg-black">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project / Client</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Total Budget</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Your Cut ({agency.commission_percent}%)</span>
            </div>
            
            <div className="divide-y divide-gray-800">
              {projects.map((p) => {
                const cfg = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.BRIEFING;
                const cut = p.total_value * (agency.commission_percent / 100);
                return (
                  <div
                    key={p.id}
                    className="grid grid-cols-[2fr_1fr_auto_auto] gap-8 px-8 py-6 hover:bg-gray-900 transition-colors duration-200 items-center"
                  >
                    <div className="min-w-0">
                      <p className="text-base text-white font-bold truncate">{p.title}</p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {p.client.company_name || p.client.full_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                      <span className="text-sm text-white font-bold">{cfg.label}</span>
                    </div>
                    <span className="text-base text-gray-400 font-mono tabular-nums text-right">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p.total_value)}
                    </span>
                    <span className="text-base text-white font-bold font-mono tabular-nums text-right">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cut)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
