import { prisma } from "@smartkode/database";
import { ArrowUpRight, Users, Briefcase, DollarSign, TrendingUp, Bell } from "lucide-react";
import Link from "next/link";
import { RevenueChart, LeadsChart } from "../../../components/dashboard-charts";
import Image from "next/image";

export default async function AgencyOverviewPage() {
  const agency = await prisma.agency.findFirst({
    where: { is_active: true },
    include: { user: true },
  });

  if (!agency) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-black">
        <div className="text-center space-y-3 max-w-sm">
          <p className="text-xl text-white font-bold">No active agency found</p>
          <p className="text-sm text-gray-400">Please contact SmartKode support.</p>
        </div>
      </div>
    );
  }

  const clients = await prisma.client.findMany({
    where: { agency_id: agency.id },
    include: { projects: { select: { id: true } } },
    orderBy: { created_at: "desc" },
    take: 5,
  });

  const agencyProjects = await prisma.project.findMany({
    where: { client: { source_agency_id: agency.id } },
  });

  const activeCount = agencyProjects.filter(
    (p) => !["DELIVERED", "CANCELLED"].includes(p.status)
  ).length;

  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-8 max-w-7xl mx-auto bg-black text-white pb-10">
      
      {/* Header Area */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Agency Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Real-time overview of your SmartKode referrals.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-white transition-colors">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <Link
            href="/intake"
            className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-200 text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            + New Lead
          </Link>
        </div>
      </div>

      {/* Large Hero Banner (Like Reference) */}
      <div 
        className="relative w-full overflow-hidden rounded-3xl border border-gray-800 bg-black p-8 md:p-12 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      >
        {/* Subtle background glow effect for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-xl">
          <p className="text-gray-400 font-semibold tracking-widest text-xs uppercase mb-3">Welcome Back</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Hello, {agency.company_name}!
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-md">
            Your agency is currently on a <span className="text-white font-bold">{agency.commission_percent}%</span> commission split. Keep submitting high-quality leads to grow your revenue.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white hover:bg-white hover:text-black text-white text-sm font-bold transition-all"
          >
            View Active Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Abstract shapes / illustrations representing data, matching the 3D vibes in reference */}
        <div className="absolute right-10 bottom-0 hidden lg:flex items-end justify-center w-64 h-full pointer-events-none opacity-80">
          <div className="relative w-full h-full">
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full opacity-20" />
            <div className="absolute top-1/4 right-0 w-16 h-16 bg-white rotate-12 rounded-lg opacity-10" />
            <div className="absolute top-1/2 left-0 w-24 h-24 border border-white rotate-45 rounded-xl opacity-30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Charts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-800 bg-black p-6 flex flex-col justify-between hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full">Total Paid</span>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-white tabular-nums tracking-tight">{formatter.format(agency.total_earned)}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">Lifetime Commissions</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-black p-6 flex flex-col justify-between hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full">Leads</span>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-white tabular-nums tracking-tight">{agency.total_clients_sent}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">Total Clients Referred</p>
              </div>
            </div>
          </div>

          {/* Large Chart Area */}
          <div className="rounded-3xl border border-gray-800 bg-black p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                <p className="text-sm text-gray-400 mt-1">Your commission earnings over the last 6 months.</p>
              </div>
              <select className="bg-black border border-gray-800 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-white cursor-pointer">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="w-full h-[250px]">
               <RevenueChart />
            </div>
          </div>
        </div>

        {/* Right Column: Mini Stats & Recent Activity */}
        <div className="space-y-8">
          
          {/* Mini Chart Card */}
          <div className="rounded-3xl border border-gray-800 bg-black p-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-white">{activeCount}</p>
              </div>
              <Briefcase className="w-6 h-6 text-gray-600" />
            </div>
            <div className="w-full h-[100px]">
               <LeadsChart />
            </div>
          </div>

          {/* Recent Clients List */}
          <div className="rounded-3xl border border-gray-800 bg-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Leads</h3>
              <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">See all</Link>
            </div>
            
            {clients.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center border border-dashed border-gray-800 rounded-xl">No leads yet.</p>
            ) : (
              <div className="space-y-5">
                {clients.map((c) => (
                  <div key={c.id} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center bg-black text-sm font-bold group-hover:border-white transition-colors">
                        {c.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:underline decoration-gray-500 underline-offset-4">{c.full_name}</p>
                        <p className="text-xs text-gray-400">{c.company_name || "Independent"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{c.projects.length} Proj.</p>
                      <p className="text-xs text-gray-500">{formatter.format(c.lifetime_value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/intake" className="mt-8 w-full block text-center py-3 rounded-xl border border-gray-800 hover:border-white text-sm font-bold text-white transition-colors">
              Submit New Lead
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
