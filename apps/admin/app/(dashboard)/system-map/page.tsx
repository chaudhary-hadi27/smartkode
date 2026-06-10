import { SystemMap } from "../../../components/system-map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smartkode/ui";
import { prisma } from "@smartkode/database";

const LEGEND = [
  { color: "bg-emerald-500", label: "Agency → Client intake flow"              },
  { color: "bg-amber-500",   label: "Admin orchestration & profit split"       },
  { color: "bg-blue-500",    label: "Client payment & file delivery"           },
  { color: "bg-purple-500",  label: "AI brief generation & retention triggers" },
  { color: "bg-teal-500",    label: "Payment rail (multi-currency)"            },
  { color: "bg-red-500",     label: "Retention campaign triggers (dashed)"     },
];

export default async function SystemMapPage() {
  const settings = await prisma.profitSettings.findFirst();
  const agencyPct = settings?.agency_default_percent || 10;
  const techPct = settings?.tech_default_percent || 40;
  const adminPct = settings?.admin_profit_percent || 50;

  const STEPS = [
    { step: 1, actor: "Agency 🏢",  action: "Registers on agency.smartkode.co and submits a Client intake form with project requirements." },
    { step: 2, actor: "System 🤖",  action: "AI Engine auto-generates a P1 Brief from the intake form using Groq LLaMA 3.3." },
    { step: 3, actor: "Admin 👑",   action: "Reviews the AI-drafted brief, selects a Tech Company from the pool, and assigns the project." },
    { step: 4, actor: "Tech ⚙️",   action: "Builds the project, uploads deliverable files. VirusTotal scans every file. AI QA bot checks quality." },
    { step: 5, actor: "System 📄",  action: `Invoice Engine auto-creates a PDF invoice with ${agencyPct}% Agency / ${techPct}% Tech / ${adminPct}% Admin splits applied.` },
    { step: 6, actor: "Client 👤",  action: "Receives invoice via email, pays via their preferred method (Wise, JazzCash, USDT, etc.)." },
    { step: 7, actor: "System 💳",  action: "Payment confirmed → Admin split released → Agency commission payout → Tech payment released." },
    { step: 8, actor: "Client 👤",  action: "Downloads clean, QA-passed deliverable files from client.smartkode.co." },
    { step: 9, actor: "AI 🔄",     action: "After 48h and 30 days, AI sends personalised retention messages to re-engage for next project." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">System Visual Map</h1>
        <p className="text-gray-400 mt-1">
          Live wiring diagram of the entire SmartKode automated platform — from Agency lead to Admin profit.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-2 text-xs text-gray-400">
            <span className={`w-3 h-3 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>

      {/* SVG Wiring Diagram */}
      <SystemMap />

      {/* Step-by-step process */}
      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">End-to-End Process Flow</CardTitle>
          <CardDescription className="text-gray-400">
            Every project goes through this 9-step automated lifecycle — zero manual work except for reviewing the brief and assigning tech.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/60 via-blue-500/40 to-emerald-500/60" />

            <div className="space-y-6 pl-16">
              {STEPS.map((s) => (
                <div key={s.step} className="relative">
                  {/* Step circle */}
                  <div className="absolute -left-10 w-8 h-8 rounded-full bg-black border border-gray-700 flex items-center justify-center text-xs font-bold text-amber-400">
                    {s.step}
                  </div>
                  <div className="rounded-xl border border-gray-800 bg-black p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{s.actor}</span>
                    </div>
                    <p className="text-sm text-gray-400">{s.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Split Calculator Visual */}
      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Automated Profit Split Formula</CardTitle>
          <CardDescription className="text-gray-400">
            Applied to every invoice the moment payment is confirmed. Zero manual calculation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Agency Commission",  pct: `${agencyPct}%`, color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400", desc: "Finder's fee for sourcing the client" },
              { label: "Tech Payout",        pct: `${techPct}%`, color: "border-blue-500/30    bg-blue-500/5    text-blue-400",    desc: "Delivery partner's project fee"    },
              { label: "Admin Net Profit",   pct: `${adminPct}%`, color: "border-amber-500/30   bg-amber-500/5   text-amber-400",   desc: "SmartKode management & overhead"   },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border p-6 ${item.color}`}>
                <p className="text-5xl font-black">{item.pct}</p>
                <p className="font-bold mt-2">{item.label}</p>
                <p className="text-xs opacity-70 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-gray-800 bg-black p-4">
            <p className="text-xs text-gray-400 font-mono">
              <span className="text-white">Formula: </span>
              admin_profit = total_value × <span className="text-amber-400">{adminPct / 100}</span> &nbsp;|&nbsp;
              tech_cut = total_value × <span className="text-blue-400">{techPct / 100}</span> &nbsp;|&nbsp;
              agency_cut = total_value × <span className="text-emerald-400">{agencyPct / 100}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              <span className="text-white">Override: </span>
              Admin can adjust per-project in Settings page. New percentages apply to future projects only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
