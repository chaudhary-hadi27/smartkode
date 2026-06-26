"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Fingerprint, User, Building2, Globe, Phone, DollarSign } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";

interface SettingsFormProps {
  clientId: string;
  initialFullName: string;
  initialCompanyName: string;
  initialCountry: string;
  initialWhatsapp: string;
  initialCurrency: string;
  email: string;
  hasPasskey: boolean;
}

export function SettingsForm({
  clientId,
  initialFullName,
  initialCompanyName,
  initialCountry,
  initialWhatsapp,
  initialCurrency,
  email,
  hasPasskey,
}: SettingsFormProps) {
  const [fullName,    setFullName]    = useState(initialFullName);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [country,     setCountry]     = useState(initialCountry);
  const [whatsapp,    setWhatsapp]    = useState(initialWhatsapp);
  const [currency,    setCurrency]    = useState(initialCurrency);

  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [saveError, setSaveError] = useState("");

  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [passkeyDone,    setPasskeyDone]    = useState(hasPasskey);
  const [passkeyError,   setPasskeyError]   = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaved(false); setSaveError("");

    try {
      const res = await fetch("/api/client/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, fullName, companyName, country, whatsapp, currency }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRegisterPasskey() {
    setPasskeyLoading(true); setPasskeyError("");
    try {
      const optRes = await fetch(`/api/auth/webauthn/generate-options?email=${encodeURIComponent(email)}&action=register`);
      if (!optRes.ok) throw new Error("Failed to get registration options");
      const options = await optRes.json();

      const regResponse = await startRegistration(options);

      const verRes = await fetch("/api/auth/webauthn/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "register", response: regResponse }),
      });
      if (!verRes.ok) throw new Error("Verification failed");
      setPasskeyDone(true);
    } catch (err: any) {
      setPasskeyError(err?.message ?? "Passkey registration failed");
    } finally {
      setPasskeyLoading(false);
    }
  }

  const inputClass =
    "w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors";
  const labelClass = "flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1.5";

  return (
    <div className="space-y-6">
      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-5 p-6 rounded-3xl border border-gray-800 bg-white/[0.01]">
        <h2 className="text-base font-bold text-white mb-4">Profile Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              <User className="w-3.5 h-3.5" /> Full Name
            </label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              <Building2 className="w-3.5 h-3.5" /> Company
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name (optional)"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <Globe className="w-3.5 h-3.5" /> Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Pakistan"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <Phone className="w-3.5 h-3.5" /> WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+92-300-0000000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <DollarSign className="w-3.5 h-3.5" /> Preferred Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={inputClass + " cursor-pointer"}
            >
              <option value="USD">USD — US Dollar</option>
              <option value="PKR">PKR — Pakistani Rupee</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="EUR">EUR — Euro</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              disabled
              className={inputClass + " opacity-50 cursor-not-allowed"}
            />
          </div>
        </div>

        {saveError && <p className="text-sm text-red-400">{saveError}</p>}

        <button
          type="submit"
          disabled={saving}
          id="save-settings-btn"
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-100 disabled:opacity-60 transition-all"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
          ) : saved ? (
            <><CheckCircle className="w-4 h-4 text-green-600" /> Saved!</>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>

      {/* Passkey Card */}
      <div className="p-6 rounded-3xl border border-gray-800 bg-white/[0.01]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-gray-400" />
              Passkey Authentication
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              {passkeyDone
                ? "Your passkey is registered. You can use biometric login next time."
                : "Register a passkey to log in with biometrics instead of a password."}
            </p>
          </div>
          {passkeyDone ? (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold shrink-0">
              <CheckCircle className="w-3.5 h-3.5" /> Active
            </span>
          ) : (
            <button
              id="register-passkey-btn"
              onClick={handleRegisterPasskey}
              disabled={passkeyLoading}
              className="flex items-center gap-2 px-5 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-100 disabled:opacity-60 transition-all shrink-0"
            >
              {passkeyLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Registering…</>
              ) : (
                <><Fingerprint className="w-4 h-4" /> Register Passkey</>
              )}
            </button>
          )}
        </div>
        {passkeyError && <p className="text-sm text-red-400 mt-3">{passkeyError}</p>}
      </div>
    </div>
  );
}
