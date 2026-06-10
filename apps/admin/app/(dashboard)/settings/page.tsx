import { prisma } from "@smartkode/database";
import { SettingsForm } from "../../../components/settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@smartkode/ui";

export default async function SettingsPage() {
  const settings = await prisma.profitSettings.findFirst({
    orderBy: { updated_at: "desc" },
  });

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No profit settings found. Run the database seed first.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center p-4">
      <div className="space-y-8 w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Global Settings</h1>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Configure the automated profit-split percentages for all new projects.
          </p>
        </div>

        <SettingsForm current={settings} />

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-900/50 py-3 rounded-full border border-gray-800">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Last updated on <span className="font-bold text-gray-300">{new Date(settings.updated_at).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
