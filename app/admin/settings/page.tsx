import { PreferencesCard } from "@/components/admin/settings/preferences-card";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h3 className="text-xl font-bold">Configurações</h3>
      </div>

      <PreferencesCard />
    </div>
  );
}
