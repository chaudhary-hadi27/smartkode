"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { PasswordInput } from "../../components/password-input";

const countries = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Pakistan", code: "+92" },
  { name: "India", code: "+91" },
  { name: "Germany", code: "+49" },
  { name: "United Arab Emirates", code: "+971" }
];

export default function AgencyRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    country: "United States",
    countryCode: "+1",
    phone: "",
    password: "",
    otp: ""
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(c => c.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      country: e.target.value,
      countryCode: selected?.code || ""
    }));
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fullPhone = formData.phone ? `${formData.countryCode} ${formData.phone}` : "";

      const res = await fetch("/api/agency/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: formData.company_name,
          email: formData.email,
          country: formData.country,
          phone: fullPhone,
          password: formData.password,
          otp: formData.otp
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/register/pending");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <Image src="/logo.png" alt="SmartKode" width={26} height={26} priority className="w-[26px] h-[26px] object-contain" />
        <span className="text-base font-bold tracking-wide text-white">SmartKode</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-extrabold text-white">Apply as an Agency</h1>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
              {step === 1 ? "Submit your application to become a SmartKode referral partner." : `Enter the 6-digit verification code sent to ${formData.email}`}
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white">Company Name *</label>
                  <input
                    type="text" required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white">Business Email *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white">Country *</label>
                  <select
                    required
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer appearance-none"
                  >
                    {countries.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white">Phone Number (Optional)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm border-b-2 border-gray-700 py-2.5 px-2">{formData.countryCode}</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="300 1234567"
                      className="flex-1 bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-white">Set a Password *</label>
                  <PasswordInput 
                    id="password" 
                    name="password" 
                    required 
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Continue to Verification <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-white text-center">6-Digit Code</label>
                <input
                  type="text" required maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                  className="w-full text-center tracking-[1em] text-2xl bg-black border-b-2 border-gray-700 px-0 py-4 text-white placeholder-gray-800 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading || formData.otp.length !== 6}
                className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Apply"}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-sm text-gray-500 hover:text-white transition-colors text-center"
              >
                Go back
              </button>
            </form>
          )}

          {step === 1 && (
            <p className="text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-white underline underline-offset-4 hover:no-underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
