// @ts-nocheck — dev bypass: mock data active; remove when live DB is connected
import { auth } from "@smartkode/auth";
import { prisma } from "@smartkode/database";
import { SettingsForm } from "../../../components/settings-form";

export default async function SettingsPage() {
  // ── DEV BYPASS ──────────────────────────────────────────────────────────────
  let session = null;
  try { session = await auth(); } catch (_) {}
  if (!session?.user?.email) session = { user: { email: "dev-client@smartkode.co" } };

  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email || "" },
      include: {
        client: true,
      },
    });
  } catch (_) {}

  // ── MOCK DATA ───────────────────────────────────────────────────────────────
  if (!user?.client) {
    user = {
      id: "mock-user",
      email: session?.user?.email,
      client: {
        id: "mock-client",
        full_name: "Hadi Chaudhary",
        company_name: "SmartKode Client Co.",
        country: "Pakistan",
        whatsapp_number: "+92-300-1234567",
        preferred_currency: "USD",
        passkey_credential: null,
      },
    } as any;
  }

  const client = user.client;

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your profile and account preferences.</p>
      </div>

      {/* ── BIG GREY-800 ACCOUNT PANEL ─────────────────────────────────────── */}
      <div className="rounded-3xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-700 border border-gray-600 flex items-center justify-center text-white text-xl font-black shrink-0">
            {client.full_name?.[0]?.toUpperCase() ?? "C"}
          </div>
          <div>
            <p className="text-xl font-extrabold font-mono text-white">{client.full_name}</p>
            <p className="text-xs text-zinc-400 uppercase tracking-widest mt-0.5">{client.company_name ?? "Client"}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <SettingsForm
        clientId={client.id}
        initialFullName={client.full_name ?? ""}
        initialCompanyName={client.company_name ?? ""}
        initialCountry={client.country ?? ""}
        initialWhatsapp={client.whatsapp_number ?? ""}
        initialCurrency={client.preferred_currency ?? "USD"}
        email={user.email ?? ""}
        hasPasskey={!!client.passkey_credential}
      />
    </div>
  );
}
