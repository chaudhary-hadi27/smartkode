import { Wallet } from "lucide-react";

export default function PayoutsPage() {
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
          <h1 className="text-4xl font-extrabold text-white mb-4">Commission Log</h1>
          <p className="text-lg text-gray-400 max-w-xl">
            A complete historical ledger of all payments released to your agency.
          </p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-gray-800 bg-black p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Lifetime Earnings</span>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center">
              <Wallet aria-hidden="true" className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-6xl font-extrabold text-white tabular-nums tracking-tighter">$0.00</p>
          <p className="text-sm text-gray-400 mt-4 font-medium">Across all completed projects</p>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-black p-10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pending Release</span>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center">
              <Wallet aria-hidden="true" className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-6xl font-extrabold text-white tabular-nums tracking-tighter">$0.00</p>
          <p className="text-sm text-gray-400 mt-4 font-medium">Awaiting sprint completion</p>
        </div>
      </div>

      {/* Payout History */}
      <div className="rounded-3xl border border-gray-800 bg-black overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-800 bg-black">
          <h2 className="text-xl font-bold text-white">Payout History</h2>
          <p className="text-sm text-gray-400 mt-1">
            Automated payouts are sent via your preferred method upon project delivery.
          </p>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-4 gap-8 px-8 py-4 border-b border-gray-800 bg-black">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Reference</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Status</span>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <p className="text-xl text-white font-bold">No payouts yet</p>
          <p className="text-base text-gray-500">Payouts are triggered once a project is marked Delivered.</p>
        </div>
      </div>
    </div>
  );
}
