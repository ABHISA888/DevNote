export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400">Welcome to your DevLaunch hub. Here is an overview of your active resources.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active Workspace</div>
          <div className="mt-2 text-2xl font-bold">DevLaunch Client</div>
          <p className="mt-1 text-sm text-slate-400">React + Tailwind client project</p>
          <a
            href="/workspace/devlaunch-client"
            className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Enter Workspace →
          </a>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">API Gateways</div>
          <div className="mt-2 text-2xl font-bold">4 Active endpoints</div>
          <p className="mt-1 text-sm text-slate-400">Checking status and response latency</p>
          <a
            href="/settings"
            className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Manage APIs →
          </a>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Environment Variables</div>
          <div className="mt-2 text-2xl font-bold">12 Keys Secured</div>
          <p className="mt-1 text-sm text-slate-400">Encrypted in local environment vaults</p>
          <a
            href="/settings"
            className="inline-block mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Configure →
          </a>
        </div>
      </div>
    </div>
  );
}
