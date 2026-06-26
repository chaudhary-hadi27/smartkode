"use client";

import { useState } from "react";
import { Receipt, X, Copy, CheckCheck, ExternalLink, CheckCircle } from "lucide-react";

const STATUS_STYLE: Record<string, string> = {
  DRAFT:   "bg-gray-500/10 text-gray-400 border-gray-500/20",
  SENT:    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  PAID:    "bg-green-500/10 text-green-400 border-green-500/20",
  OVERDUE: "bg-red-500/10 text-red-400 border-red-500/20",
};

const PAYMENT_METHODS = [
  {
    id: "wise",
    name: "Wise",
    description: "International bank transfer",
    details: "Account: SmartKode Technologies\nIBAN: GB29 NWBK 6016 1331 9268 19\nBIC: NWBKGB2L",
  },
  {
    id: "easypaisa",
    name: "EasyPaisa",
    description: "Mobile wallet (Pakistan)",
    details: "Account Name: SmartKode\nMobile: +92-300-1234567",
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    description: "Mobile wallet (Pakistan)",
    details: "Account Name: SmartKode\nMobile: +92-311-7654321",
  },
  {
    id: "crypto",
    name: "Crypto (USDT)",
    description: "TRC20 or ERC20",
    details: "TRC20: TSmartKodeAddressXXXXXXXXXXXXXX\nERC20: 0xSmartKodeAddressXXXXXXXXXXX",
  },
];

interface Invoice {
  id: string;
  invoice_number: string;
  project_title?: string;
  amount: number;
  status: string;
  sent_at?: Date | string;
}

export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  const [selected, setSelected]   = useState<Invoice | null>(null);
  const [method,   setMethod]     = useState<string | null>(null);
  const [copied,   setCopied]     = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  });

  function copyDetails(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);

  return (
    <>
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between p-5 rounded-2xl border border-gray-800 bg-white/[0.01] hover:border-gray-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{inv.invoice_number}</p>
                {inv.project_title && (
                  <p className="text-xs text-gray-500">{inv.project_title}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {inv.sent_at && (
                <p className="text-xs text-gray-600 hidden sm:block">
                  {new Date(inv.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              )}
              <p className="text-sm font-bold text-white">{formatter.format(inv.amount)}</p>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${STATUS_STYLE[inv.status] ?? STATUS_STYLE.DRAFT}`}>
                {inv.status === "PAID" ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" />{inv.status}</span> : inv.status}
              </span>
              {inv.status !== "PAID" && (
                <button
                  onClick={() => { setSelected(inv); setMethod(null); }}
                  className="px-4 py-1.5 text-xs font-bold bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-bold text-white">Pay Invoice</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {selected.invoice_number} · <span className="text-white font-bold">{formatter.format(selected.amount)}</span>
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Payment Methods */}
            <div className="p-6 space-y-3">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Select Payment Method</p>
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    method === m.id
                      ? "border-white bg-white/5"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{m.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                    </div>
                    {method === m.id && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                </button>
              ))}

              {/* Payment Details */}
              {selectedMethod && (
                <div className="mt-4 p-4 rounded-2xl bg-gray-900 border border-gray-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Transfer Details</p>
                      <pre className="text-sm text-white whitespace-pre-wrap font-mono leading-relaxed">
                        {selectedMethod.details}
                      </pre>
                    </div>
                    <button
                      onClick={() => copyDetails(selectedMethod.details)}
                      className="ml-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors shrink-0"
                      title="Copy details"
                    >
                      {copied ? (
                        <CheckCheck className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 border-t border-gray-800 pt-3">
                    After sending payment, please share your transfer receipt with your SmartKode account manager.
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setSelected(null)}
                className="w-full py-3 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
