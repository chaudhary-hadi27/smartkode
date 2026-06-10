import { Settings } from "lucide-react";
import { auth } from "@smartkode/auth";
import { PasskeyRegistration } from "../../../components/passkey-registration";

export default async function SettingsPage() {
  const session = await auth();
  const email = session?.user?.email;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      {/* Page Header */}
      <div 
        className="relative w-full rounded-3xl border border-gray-800 bg-black p-8 md:p-12 overflow-hidden"
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      >
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Payout Settings</h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Configure how you want to receive your commission payouts from SmartKode.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Info */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Payment Details</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We support direct crypto transfers (USDT), Wise, and traditional wire transfers. Updates to this form apply to the next billing cycle.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black p-6">
            <h3 className="text-sm font-bold text-white mb-3">Security Note</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Payment details are encrypted at rest and only used for automated commission disbursement. SmartKode will never initiate unsolicited transfers.
            </p>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="lg:col-span-2">
          <form className="space-y-8">
            <div className="space-y-8 rounded-3xl border border-gray-800 bg-black p-8 md:p-10">
              
              <div className="space-y-2">
                <label htmlFor="method" className="block text-sm font-bold text-white">
                  Preferred Payout Method <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="method"
                    name="method"
                    autoComplete="off"
                    defaultValue="usdt"
                    className="w-full appearance-none bg-black border-b-2 border-gray-800 px-0 py-3 text-base text-white focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer"
                  >
                    <option value="usdt">Crypto — USDT (TRC20 / ERC20)</option>
                    <option value="wise">Wise Transfer</option>
                    <option value="bank">Direct Bank Transfer</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="accountDetails" className="block text-sm font-bold text-white">
                  Wallet Address or Account Details <span className="text-red-500">*</span>
                </label>
                <input
                  id="accountDetails"
                  name="accountDetails"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="e.g. TV6... or wise@agency.com"
                  className="w-full bg-black border-b-2 border-gray-800 px-0 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                />
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-black text-sm font-bold transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Save Payment Settings
              </button>
            </div>
          </form>

          {email && <PasskeyRegistration email={email} />}
        </div>
      </div>
    </div>
  );
}
