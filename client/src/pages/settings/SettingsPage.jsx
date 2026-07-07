export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-slate-400">Configure global app settings, API vaults, and third-party integrations.</p>
      </div>

      <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 max-w-xl space-y-4">
        <h3 className="text-lg font-semibold text-slate-200">Global Configurations</h3>
        <p className="text-sm text-slate-400">Toggle developer options and system behavior.</p>
        <div className="pt-4 border-t border-slate-700 space-y-2">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500" />
            Enable API polling telemetry
          </label>
        </div>
      </div>
    </div>
  );
}
