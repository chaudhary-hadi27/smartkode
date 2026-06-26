"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Fingerprint, Loader2, Eye, EyeOff, Mail, KeyRound, AlertCircle } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";

// ─── Password Input ────────────────────────────────────────────────────────
function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
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

// ─── Main Login Page ────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"credentials" | "passkey" | "otp" | null>(null);
  const [error, setError] = useState("");

  // Passkey multi-step state
  const [passkeyStep, setPasskeyStep] = useState<"idle" | "email" | "otp" | "prompt">("idle");
  const [otp, setOtp] = useState("");

  // ── Credentials Login ──────────────────────────────────────────────────
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("credentials");
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(null);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(null);
    }
  };

  // ── Passkey Flow ───────────────────────────────────────────────────────
  const startPasskeyFlow = () => {
    if (!email) {
      setPasskeyStep("email");
    } else {
      sendPasskeyOTP(email);
    }
  };

  const sendPasskeyOTP = async (targetEmail: string) => {
    setLoading("passkey");
    setError("");
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      setPasskeyStep("otp");
    } catch (err: unknown) {
      setError((err as Error).message);
      setPasskeyStep("idle");
    } finally {
      setLoading(null);
    }
  };

  const verifyOTPAndPromptPasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("otp");
    setError("");

    try {
      // 1. Verify OTP
      const verifyRes = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Invalid verification code");

      setPasskeyStep("prompt");

      // 2. Get WebAuthn authentication options from server
      const optionsRes = await fetch(
        `/api/auth/webauthn/generate-options?email=${encodeURIComponent(email)}`
      );
      const options = await optionsRes.json();
      if (!optionsRes.ok) throw new Error(options.error || "Failed to get passkey options");

      // 3. Start native WebAuthn flow (biometric / security key / QR scan)
      let asseResp;
      try {
        asseResp = await startAuthentication(options);
      } catch (err: unknown) {
        throw new Error((err as Error).message || "Passkey authentication was cancelled");
      }

      // 4. Verify the assertion on the server
      const verificationRes = await fetch("/api/auth/webauthn/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, response: asseResp }),
      });
      const verification = await verificationRes.json();

      if (verification.verified && verification.userId) {
        // 5. Create NextAuth session
        const res = await signIn("passkey", {
          userId: verification.userId,
          passkeyVerification: "success",
          redirect: false,
          callbackUrl,
        });
        if (res?.error) throw new Error("Failed to create session");
        router.push(callbackUrl);
        router.refresh();
      } else {
        throw new Error("Passkey verification failed. Please try again.");
      }
    } catch (err: unknown) {
      setError((err as Error).message);
      setPasskeyStep("idle");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center gap-3 border-b border-gray-900">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0">
          <span className="text-black font-black text-xs">SK</span>
        </div>
        <span className="text-base font-bold tracking-wide text-white">SmartAuth</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-8 animate-slide-up">

          {/* Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
              {passkeyStep === "prompt" ? (
                <Fingerprint className="w-7 h-7 text-white animate-pulse" />
              ) : passkeyStep === "otp" ? (
                <Mail className="w-7 h-7 text-white" />
              ) : (
                <KeyRound className="w-7 h-7 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {passkeyStep === "idle" ? "Welcome back" : passkeyStep === "otp" ? "Check your email" : passkeyStep === "prompt" ? "Authenticating…" : "Enter email"}
            </h1>
            <p className="text-sm text-gray-400">
              {passkeyStep === "idle"
                ? "Sign in to your account securely."
                : passkeyStep === "otp"
                ? `We sent a 6-digit code to ${email}`
                : passkeyStep === "prompt"
                ? "Complete the biometric prompt on your device. On iOS/Android you can scan a QR code."
                : "Enter the email linked to your passkey."}
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* ── Step: idle — main login form ── */}
          {passkeyStep === "idle" && (
            <>
              <form onSubmit={handleCredentialsLogin} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">
                      Password
                    </label>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>

                <button
                  id="btn-sign-in"
                  type="submit"
                  disabled={!!loading}
                  className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.12)] disabled:opacity-60"
                >
                  {loading === "credentials" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-800" />
                <span className="text-xs text-gray-600 font-semibold uppercase">Or use passkey</span>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <button
                id="btn-passkey"
                type="button"
                onClick={startPasskeyFlow}
                disabled={!!loading}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-transparent border-2 border-gray-700 px-6 py-3 text-white text-sm font-bold transition-all hover:border-gray-400 hover:bg-gray-800/50 active:scale-[0.98] disabled:opacity-50"
              >
                {loading === "passkey" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Fingerprint className="w-4 h-4" />
                )}
                Sign in with Passkey
              </button>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-white font-semibold underline underline-offset-4 hover:no-underline">
                  Create one
                </Link>
              </p>
            </>
          )}

          {/* ── Step: email — collect email for passkey ── */}
          {passkeyStep === "email" && (
            <form onSubmit={(e) => { e.preventDefault(); sendPasskeyOTP(email); }} className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  placeholder="you@example.com"
                  className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                />
              </div>
              <button
                id="btn-send-otp"
                type="submit"
                disabled={!!loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-60"
              >
                {loading === "passkey" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Verification Code"}
              </button>
              <button type="button" onClick={() => setPasskeyStep("idle")} className="w-full text-sm text-gray-500 hover:text-white transition-colors">
                ← Back to sign in
              </button>
            </form>
          )}

          {/* ── Step: otp — enter 6-digit code ── */}
          {passkeyStep === "otp" && (
            <form onSubmit={verifyOTPAndPromptPasskey} className="space-y-6">
              <div className="space-y-1.5 text-center">
                <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
                  Verification Code
                </label>
                <input
                  id="otp-input"
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
              </div>
              <button
                id="btn-verify-otp"
                type="submit"
                disabled={!!loading || otp.length !== 6}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-50"
              >
                {loading === "otp" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Use Passkey"}
              </button>
              <button type="button" onClick={() => setPasskeyStep("idle")} className="w-full text-sm text-gray-500 hover:text-white transition-colors">
                ← Back to sign in
              </button>
            </form>
          )}

          {/* ── Step: prompt — waiting for biometric ── */}
          {passkeyStep === "prompt" && (
            <div className="py-12 flex flex-col items-center gap-5 text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center">
                  <Fingerprint className="w-10 h-10 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping bg-gray-700/30" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Waiting for your passkey…</p>
                <p className="text-sm text-gray-400 mt-2 max-w-xs">
                  Use Touch ID, Face ID, Windows Hello, or scan the QR code with your phone.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-900 text-center">
        <p className="text-xs text-gray-600">
          Protected by SmartAuth · End-to-end encrypted · FIDO2 compliant
        </p>
      </footer>
    </div>
  );
}
