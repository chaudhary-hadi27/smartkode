import { prisma } from "@smartkode/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@smartkode/ui";
import { InviteButton } from "../../../components/invite-button";
import { EditCommissionButton } from "../../../components/edit-commission-button";
import { AgencyApprovalButtons } from "../../../components/agency-approval-buttons";
import { Clock } from "lucide-react";

export default async function AgenciesPage() {
  const allAgencies = await prisma.agency.findMany({
    include: {
      user: { select: { email: true, created_at: true } },
    },
    orderBy: { joined_at: "desc" },
  });

  const pending = allAgencies.filter((a) => !a.is_active);
  const active  = allAgencies.filter((a) => a.is_active);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Agencies CRM</h1>
          <p className="text-gray-400 mt-1">Manage your network of lead-generating agencies.</p>
        </div>
        <InviteButton type="Agency" />
      </div>

      {/* ── Pending Applications ─────────────────────────────── */}
      {pending.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-black overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-gray-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Pending Applications
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-xs font-bold">
                  {pending.length}
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Review and approve or reject new agency registrations from{" "}
                <span className="text-gray-300">agency.smartkode.co/register</span>
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {pending.map((agency) => (
              <div key={agency.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 hover:bg-gray-900/50 transition-colors">
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{agency.company_name}</p>
                  <p className="text-xs text-gray-400">{agency.user.email}</p>
                  <p className="text-xs text-gray-600">
                    {agency.country || "No country"} · Applied{" "}
                    {new Date(agency.joined_at).toLocaleDateString("en-US", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="shrink-0">
                  <AgencyApprovalButtons agencyId={agency.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Active Agencies Table ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Active Agencies</CardTitle>
          <CardDescription>
            All approved agencies, their commission rates, and performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Leads Sent</TableHead>
                <TableHead className="text-right">Total Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {active.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                    No active agencies yet. Approve a pending application above.
                  </TableCell>
                </TableRow>
              ) : (
                active.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-medium text-white">{agency.company_name}</TableCell>
                    <TableCell className="text-gray-400">{agency.user.email}</TableCell>
                    <TableCell className="text-gray-400">{agency.country || "—"}</TableCell>
                    <TableCell className="text-right font-bold text-white">
                      <div className="flex items-center justify-end gap-1">
                        {agency.commission_percent}%
                        <EditCommissionButton id={agency.id} type="agency" currentPct={agency.commission_percent} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-300">{agency.total_clients_sent}</TableCell>
                    <TableCell className="text-right font-medium text-white">
                      ${agency.total_earned.toLocaleString()}
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
