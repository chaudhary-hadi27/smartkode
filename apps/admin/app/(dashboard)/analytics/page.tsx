import { prisma } from "@smartkode/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smartkode/ui";

export default async function AnalyticsPage() {
  const totalProjects = await prisma.project.count();
  const totalAgencies = await prisma.agency.count();
  const totalClients = await prisma.client.count();
  const totalInvoices = await prisma.invoice.count();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
        <p className="text-muted-foreground mt-1">
          High-level metrics and system-wide data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">
              {totalProjects}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Projects processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-500">
              {totalAgencies}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Active agencies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">
              {totalClients}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Managed directly & indirectly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Invoices Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-500">
              {totalInvoices}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total billing records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Deep dive historical charts, cohort analysis, and predictive revenue forecasting will appear here in Phase 6.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[#333] text-muted-foreground">
            More analytics charts pending more historical data...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
