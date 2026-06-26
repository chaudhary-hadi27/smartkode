"use client";

import { approveAgency, rejectAgency } from "../app/actions/agency-approval";
import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function AgencyApprovalButtons({ agencyId, showReject = true }: { agencyId: string; showReject?: boolean }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  const handleApprove = async () => {
    setLoading("approve");
    await approveAgency(agencyId);
    setLoading(null);
  };

  const handleReject = async () => {
    if (!confirm("Are you sure you want to reject and delete this application? This cannot be undone.")) return;
    setLoading("reject");
    await rejectAgency(agencyId);
    setLoading(null);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleApprove}
        disabled={!!loading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-200 text-black text-xs font-bold transition-all disabled:opacity-50"
      >
        {loading === "approve" ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <CheckCircle className="w-3 h-3" />
        )}
        Approve
      </button>
      {showReject && (
        <button
          type="button"
          onClick={handleReject}
          disabled={!!loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-white text-gray-400 hover:text-white text-xs font-medium transition-all disabled:opacity-50"
        >
          {loading === "reject" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          Reject
        </button>
      )}
    </div>
  );
}
