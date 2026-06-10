"use client";

import { Button } from "@smartkode/ui";
import { Link, Copy, Mail } from "lucide-react";
import { useState } from "react";

export function InviteButton({ type, defaultZeroAgency = false }: { type: "Agency" | "Client" | "Tech Company", defaultZeroAgency?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let link = `https://${type.toLowerCase().split(' ')[0]}.smartkode.co/register`;
    if (defaultZeroAgency) {
      link += "?direct=true&agency_cut=0";
    }
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={handleCopy}
        className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
      >
        {copied ? "Copied!" : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy {type} Invite Link
          </>
        )}
      </Button>
    </div>
  );
}
