"use client";

import { useState } from "react";
import { Fingerprint, Loader2, CheckCircle } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";

export function PasskeyRegistration({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerPasskey = async () => {
    if (!email) {
      setError("You must be logged in to register a passkey.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Get registration options from server
      const optionsRes = await fetch(`/api/auth/webauthn/generate-options?action=register&email=${encodeURIComponent(email)}`);
      const options = await optionsRes.json();

      if (!optionsRes.ok) {
        throw new Error(options.error || "Failed to get registration options");
      }

      // 2. Start WebAuthn flow in browser
      let attResp;
      try {
        attResp = await startRegistration(options);
      } catch (err: any) {
        throw new Error(err.message || "Passkey registration cancelled");
      }

      // 3. Verify response with server
      const verificationRes = await fetch("/api/auth/webauthn/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", email, response: attResp }),
      });

      const verification = await verificationRes.json();

      if (verification.verified) {
        setSuccess(true);
      } else {
        throw new Error("Passkey verification failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-800 bg-black p-8 md:p-10 space-y-6 mt-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Cross-Device Passkey</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          Register a passkey using your device's biometrics (FaceID/Fingerprint). If you are on a laptop, scanning the generated QR code with your phone allows you to securely login with your phone's fingerprint.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <p className="text-sm font-medium text-emerald-500">Passkey registered successfully! You can now use it to sign in.</p>
        </div>
      )}

      {!success && (
        <button
          type="button"
          onClick={registerPasskey}
          disabled={loading}
          className="group flex items-center justify-center gap-3 rounded-full border-2 border-gray-700 bg-transparent px-6 py-3 text-white text-sm font-bold transition-all hover:border-white hover:bg-gray-900 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
          Register New Passkey
        </button>
      )}
    </div>
  );
}
