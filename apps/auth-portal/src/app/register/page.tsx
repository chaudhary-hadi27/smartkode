"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Mail, User, Lock, CheckCircle, Fingerprint, AlertCircle, Eye, EyeOff } from "lucide-react";

type Step = "details" | "otp" | "passkey" | "done";

// ─── Password Input ────────────────────────────────────────────────────────
function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        minLength={8}
        placeholder={placeholder}
        className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ─── Step Indicator ─────────────────────────────────────────────────────────
function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "w-6 h-2 bg-white"
              : i < current
              ? "w-2 h-2 bg-gray-500"
              : "w-2 h-2 bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  const stepIndex = step === "details" ? 0 : step === "otp" ? 1 : 2;

  // ── Step 1: Register ────────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setUserId(data.userId);
      setStep("otp");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Verify OTP ──────────────────────────────────────────────────
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      setStep("passkey");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Register Passkey (optional) ─────────────────────────────────
  const handleRegisterPasskey = async () => {
    setError("");
    setLoading(true);
    try {
      // Get registration options
      const optionsRes = await fetch("/api/auth/webauthn/register-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const options = await optionsRes.json();
      if (!optionsRes.ok) throw new Error(options.error || "Failed to get passkey options");

      // Start native WebAuthn registration
      const { startRegistration } = await import("@simplewebauthn/browser");
      let regResp;
      try {
        regResp = await startRegistration(options);
      } catch (err: unknown) {
        throw new Error((err as Error).message || "Passkey registration cancelled");
      }

      // Verify registration on server
      const verifyRes = await fetch("/api/auth/webauthn/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, response: regResp }),
      });
      const result = await verifyRes.json();
      if (!result.verified) throw new Error("Passkey registration verification failed");

      setStep("done");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const skipPasskey = () => setStep("done");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center gap-3 border-b border-gray-900">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0">
          <span className="text-black font-black text-xs">SK</span>
        </div>
        <span className="text-base font-bold tracking-wide text-white">SmartAuth</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-8 animate-slide-up">

          {step !== "done" && <StepDots current={stepIndex} />}

          {/* ── Step 1: Details ── */}
          {step === "details" && (
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
                  <User className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Create account</h1>
                <p className="text-sm text-gray-400">Set up your secure SmartAuth account.</p>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">Full Name</label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">Email Address</label>
                    <div className="relative">
                      <input
                        id="reg-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">Password</label>
                    <PasswordInput
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">Confirm Password</label>
                    <PasswordInput
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                    />
                  </div>
                </div>

                <button
                  id="btn-register"
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.12)] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-white font-semibold underline underline-offset-4 hover:no-underline">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* ── Step 2: OTP Verification ── */}
          {step === "otp" && (
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Verify email</h1>
                <p className="text-sm text-gray-400">We sent a 6-digit code to <span className="text-white font-semibold">{email}</span></p>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <input
                  id="otp-verify"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  className="w-full text-center tracking-[0.75em] text-3xl font-mono bg-black border-b-2 border-gray-700 px-0 py-4 text-white placeholder-gray-800 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="000000"
                />
                <button
                  id="btn-verify"
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Email"}
                </button>
              </form>
            </>
          )}

          {/* ── Step 3: Passkey Setup ── */}
          {step === "passkey" && (
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
                  <Fingerprint className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Add a passkey</h1>
                <p className="text-sm text-gray-400">
                  Use biometrics (Touch ID / Face ID / Windows Hello) for instant, password-free sign-in.
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Benefits */}
              <div className="rounded-2xl border border-gray-800 bg-white/[0.02] p-5 space-y-3">
                {[
                  "Instant sign-in — no password required",
                  "FIDO2 / WebAuthn standard (phishing-resistant)",
                  "Works across all your synced devices",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  id="btn-add-passkey"
                  type="button"
                  onClick={handleRegisterPasskey}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.12)] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>
                      <Fingerprint className="w-4 h-4" />
                      Set up passkey now
                    </>
                  )}
                </button>

                <button
                  id="btn-skip-passkey"
                  type="button"
                  onClick={skipPasskey}
                  className="w-full text-sm text-gray-500 hover:text-white transition-colors py-2"
                >
                  Skip for now, use password only
                </button>
              </div>
            </>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">You&apos;re all set!</h1>
                <p className="text-sm text-gray-400">
                  Your account has been created. Sign in to get started.
                </p>
              </div>
              <button
                id="btn-go-login"
                onClick={() => router.push("/login")}
                className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.12)]"
              >
                Sign in to your account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-gray-900 text-center">
        <p className="text-xs text-gray-600">
          Protected by SmartAuth · End-to-end encrypted · FIDO2 compliant
        </p>
      </footer>
    </div>
  );
}
