"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fingerprint, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";
import { PasswordInput } from "../../components/password-input";

export default function AgencyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"credentials" | "passkey" | "otp" | null>(null);
  const [error, setError] = useState("");
  
  // Passkey flow state
  const [passkeyStep, setPasskeyStep] = useState<"idle" | "email" | "otp" | "prompt">("idle");
  const [otp, setOtp] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("credentials");
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email, password, or account disabled.");
        setLoading(null);
      } else {
        router.push("/overview");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(null);
    }
  };

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
      if (!res.ok) throw new Error(data.error);
      
      setPasskeyStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
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
      if (!verifyRes.ok) throw new Error(verifyData.error);

      setPasskeyStep("prompt");
      
      // 2. Get authentication options from server
      const optionsRes = await fetch(`/api/auth/webauthn/generate-options?email=${encodeURIComponent(email)}`);
      const options = await optionsRes.json();
      if (!optionsRes.ok) throw new Error(options.error || "Failed to get passkey options");

      // 3. Start WebAuthn flow in browser
      let asseResp;
      try {
        asseResp = await startAuthentication(options);
      } catch (err: any) {
        throw new Error(err.message || "Passkey authentication cancelled");
      }

      // 4. Verify response with server
      const verificationRes = await fetch("/api/auth/webauthn/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, response: asseResp }),
      });
      const verification = await verificationRes.json();

      if (verification.verified && verification.userId) {
        // 5. Sign in to NextAuth
        const res = await signIn("passkey", {
          userId: verification.userId,
          passkeyVerification: "success",
          redirect: false,
        });

        if (res?.error) throw new Error("Failed to create session");

        router.push("/overview");
        router.refresh();
      } else {
        throw new Error("Passkey verification failed");
      }
    } catch (err: any) {
      setError(err.message);
      setPasskeyStep("idle");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <Image src="/logo.png" alt="SmartKode" width={26} height={26} priority className="w-7 h-7 object-contain" />
        <span className="text-base font-bold tracking-wide text-white">SmartKode</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Agency Sign In</h1>
            <p className="text-sm text-gray-400">
              Access your SmartKode referral partner dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {passkeyStep === "idle" && (
            <>
              <form onSubmit={handleCredentialsLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-white">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="hello@agency.co"
                      className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-white">Password</label>
                    <PasswordInput
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!!loading}
                  className="group w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-70"
                >
                  {loading === "credentials" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-800" />
                <span className="text-xs text-gray-600 font-medium uppercase">Or</span>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <button
                type="button"
                onClick={startPasskeyFlow}
                disabled={!!loading}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-transparent border-2 border-gray-700 px-6 py-3 text-white text-sm font-bold transition-all hover:border-white hover:bg-gray-900 active:scale-95 disabled:opacity-50"
              >
                {loading === "passkey" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
                Sign in with Passkey
              </button>
            </>
          )}

          {passkeyStep === "email" && (
            <form onSubmit={(e) => { e.preventDefault(); sendPasskeyOTP(email); }} className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-white">Enter Email for Passkey</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required autoFocus
                  placeholder="hello@agency.co"
                  className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={!!loading}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50"
              >
                {loading === "passkey" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Verification Code"}
              </button>
              <button type="button" onClick={() => setPasskeyStep("idle")} className="w-full text-sm text-gray-500 hover:text-white pt-2">Cancel</button>
            </form>
          )}

          {passkeyStep === "otp" && (
            <form onSubmit={verifyOTPAndPromptPasskey} className="space-y-6">
              <div className="space-y-1.5 text-center">
                <label className="block text-sm font-semibold text-white mb-2">Check your email</label>
                <p className="text-xs text-gray-400 pb-2">We sent a 6-digit code to {email}</p>
                <input
                  type="text" required maxLength={6} autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[1em] text-2xl bg-black border-b-2 border-gray-700 px-0 py-4 text-white placeholder-gray-800 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="000000"
                />
              </div>
              <button
                type="submit"
                disabled={!!loading || otp.length !== 6}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-black text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50"
              >
                {loading === "otp" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Use Passkey"}
              </button>
              <button type="button" onClick={() => setPasskeyStep("idle")} className="w-full text-sm text-gray-500 hover:text-white pt-2">Cancel</button>
            </form>
          )}

          {passkeyStep === "prompt" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center animate-pulse">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Waiting for Passkey</p>
                <p className="text-sm text-gray-400 mt-2">Please complete the prompt on your device. If your device doesn't support fingerprints, scan the QR code with your phone.</p>
              </div>
            </div>
          )}

          {passkeyStep === "idle" && (
            <p className="text-center text-sm text-gray-500 pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white font-semibold underline underline-offset-4 hover:no-underline">
                Apply as an Agency
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
