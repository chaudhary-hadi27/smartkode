"use client";

import { Button } from "@smartkode/ui";
import { Pencil } from "lucide-react";
import { updateAgencyCommission, updateTechCut } from "../app/actions";

export function EditCommissionButton({ id, type, currentPct }: { id: string, type: "agency" | "tech", currentPct: number }) {
  const handleEdit = async () => {
    const val = prompt(`Enter new commission % for this ${type}:`, currentPct.toString());
    if (!val) return;
    const num = parseFloat(val);
    if (isNaN(num) || num < 0 || num > 100) {
      alert("Invalid percentage");
      return;
    }
    
    try {
      if (type === "agency") {
        await updateAgencyCommission(id, num);
      } else {
        await updateTechCut(id, num);
      }
    } catch (e) {
      alert("Failed to update.");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleEdit} className="h-6 w-6 p-0 ml-2 hover:bg-gray-800">
      <Pencil className="w-3 h-3 text-gray-500 hover:text-white" />
    </Button>
  );
}
