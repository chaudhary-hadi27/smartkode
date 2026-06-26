import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smartkode/ui";
import { RevenueChart } from "../../../components/revenue-chart";
import { ProjectStatusChart } from "../../../components/project-status-chart";
import { prisma } from "@smartkode/database";

export default async function OverviewPage() {
  // ─── 1. Fetch Key Metrics ─────────────────────────────
  const totalProjects = await prisma.project.count();
  const activeAgencies = await prisma.agency.count({ where: { is_active: true } });
  const settings = await prisma.profitSettings.findFirst();
  const adminPct = settings?.admin_profit_percent || 50;
  
  // Calculate total network volume and admin profit
  const projects = await prisma.project.findMany();
  const totalVolume = projects.reduce((acc, p) => acc + p.total_value, 0);
  const totalAdminProfit = projects.reduce((acc, p) => acc + p.admin_profit, 0);

  // ─── 2. Prepare Chart Data ────────────────────────────
  // Project Status Distribution
  const statusCounts = await prisma.project.groupBy({
    by: ['status'],
    _count: { status: true }
  });
  
  const statusChartData = statusCounts.map(s => ({
    name: s.status,
    value: s._count.status
  }));

  // Dummy Revenue Data for Visual Demo (Since no historical timeline data exists yet)
  const revenueChartData = [
    { month: "Jan", revenue: 2400, agencyCut: 480, techCut: 1920 },
    { month: "Feb", revenue: 3600, agencyCut: 720, techCut: 2880 },
    { month: "Mar", revenue: 5200, agencyCut: 1040, techCut: 4160 },
    { month: "Apr", revenue: 4800, agencyCut: 960, techCut: 3840 },
    { month: "May", revenue: 7500, agencyCut: 1500, techCut: 6000 },
    { month: "Jun", revenue: Math.round(totalAdminProfit || 8400), agencyCut: 1680, techCut: 6720 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          SmartKode Enterprise Metrics & Real-time Profit Tracking.
        </p>
      </div>

      {/* Top Metrics Panel - Big curved rectangle in grey-800 (sidebar hover match) */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-8 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-700">
          
          <div className="flex flex-col space-y-2 first:pt-0 pt-6 sm:pt-0 lg:px-6 first:pl-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Net Admin Profit</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalAdminProfit.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Your {adminPct}% split across all projects</p>
          </div>

          <div className="flex flex-col space-y-2 pt-6 sm:pt-0 lg:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Network Volume</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">${totalVolume.toLocaleString()}</span>
            <p className="text-xs text-zinc-500 font-medium">Gross revenue generated</p>
          </div>

          <div className="flex flex-col space-y-2 pt-6 sm:pt-0 lg:px-6">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Active Agencies</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{activeAgencies}</span>
            <p className="text-xs text-zinc-500 font-medium">Generating leads globally</p>
          </div>

          <div className="flex flex-col space-y-2 pt-6 sm:pt-0 lg:px-6 last:pr-0">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Total Projects</span>
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{totalProjects}</span>
            <p className="text-xs text-zinc-500 font-medium">Through the lifecycle</p>
          </div>

        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Flow (USD)</CardTitle>
            <CardDescription>
              Visualizing Net Profit vs Tech & Agency Payouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueChartData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Project Status Pipeline</CardTitle>
            <CardDescription>
              Distribution of all active projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusChartData.length > 0 ? (
              <ProjectStatusChart data={statusChartData} />
            ) : (
              <div className="flex items-center justify-center h-[350px] text-muted-foreground border border-dashed border-[#333] rounded-lg">
                No projects active yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
