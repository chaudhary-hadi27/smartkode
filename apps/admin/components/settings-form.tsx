"use client";

import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@smartkode/ui";

interface SettingsFormProps {
  current: {
    id: string;
    agency_default_percent: number;
    tech_default_percent: number;
    admin_profit_percent: number;
  };
}

export function SettingsForm({ current }: SettingsFormProps) {
  const [agency, setAgency] = useState(current.agency_default_percent);
  const [tech, setTech]     = useState(current.tech_default_percent);
  const admin = Math.round((100 - agency - tech) * 10) / 10;

  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  async function handleSave() {
    if (agency + tech >= 100) return alert("Agency + Tech cannot exceed 100%");
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agency_percent: agency, tech_percent: tech }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Split Configuration</CardTitle>
        <CardDescription>
          Adjust the global default commission splits. Changes apply to all new projects.
          Existing projects retain the split that was active at the time of creation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6 md:p-8">
        
        {/* Preset Splits */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-300">Quick Presets</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Standard", agency: 10, tech: 60 },
              { label: "Premium Agency", agency: 15, tech: 55 },
              { label: "High Volume", agency: 20, tech: 50 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => { setAgency(preset.agency); setTech(preset.tech); }}
                className="py-2.5 px-3 rounded-xl border border-gray-800 hover:border-gray-500 hover:bg-gray-900 text-xs font-bold text-gray-300 transition-all text-center flex flex-col gap-1 items-center"
              >
                <span>{preset.label}</span>
                <span className="text-[10px] text-gray-500 font-mono">[{preset.agency}/{preset.tech}/{100-preset.agency-preset.tech}]</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gray-800" />

        <div className="space-y-6">
          {/* Agency Settings */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-300">Agency Commission</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={agency} 
                  onChange={(e) => setAgency(Math.min(40, Math.max(0, Number(e.target.value))))}
                  className="w-16 bg-black border border-gray-700 rounded-md px-2 py-1 text-center text-sm font-bold text-emerald-400 focus:border-emerald-400 focus:outline-none"
                />
                <span className="text-sm font-bold text-emerald-400">%</span>
              </div>
            </div>
            <input
              type="range" min={0} max={40} step={0.5}
              value={agency}
              onChange={(e) => setAgency(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </div>

          {/* Tech Settings */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-300">Tech Team Cut</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={tech} 
                  onChange={(e) => setTech(Math.min(70, Math.max(20, Number(e.target.value))))}
                  className="w-16 bg-black border border-gray-700 rounded-md px-2 py-1 text-center text-sm font-bold text-blue-400 focus:border-blue-400 focus:outline-none"
                />
                <span className="text-sm font-bold text-blue-400">%</span>
              </div>
            </div>
            <input
              type="range" min={20} max={70} step={0.5}
              value={tech}
              onChange={(e) => setTech(Number(e.target.value))}
              className="w-full accent-blue-400"
            />
          </div>

          {/* Admin (auto-calculated) */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-500">Your Net Profit (Auto-calculated)</span>
              <span className="text-3xl font-black text-amber-500 tabular-nums">{admin}%</span>
            </div>
            <p className="text-xs text-amber-500/70 mt-1 font-mono">= 100% − {agency}% Agency − {tech}% Tech</p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Split Preview</p>
          <div className="flex rounded-full overflow-hidden h-3 bg-gray-900">
            <div className="bg-emerald-500 transition-all duration-300" style={{ width: `${agency}%` }} title={`Agency: ${agency}%`} />
            <div className="bg-blue-500 transition-all duration-300" style={{ width: `${tech}%` }} title={`Tech: ${tech}%`} />
            <div className="bg-amber-500 transition-all duration-300" style={{ width: `${admin}%` }} title={`Admin: ${admin}%`} />
          </div>
          <div className="flex text-xs gap-6 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Agency</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Tech</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Admin</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || admin < 0}
          className="w-full h-12 rounded-full bg-white hover:bg-gray-200 hover:scale-[1.02] disabled:opacity-50 text-black font-bold transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(255,255,255,0.15)] mt-4"
        >
          {saving ? "Saving…" : saved ? "✓ Split Saved Successfully" : "Confirm New Split"}
        </button>
      </CardContent>
    </Card>
  );
}
