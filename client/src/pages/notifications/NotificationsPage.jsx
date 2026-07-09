export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Notifications</h1>
        <p className="text-slate-400">Stay updated on workspace deployments, task reminders, and system alerts.</p>
      </div>

      <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 max-w-xl space-y-4">
        <div className="flex items-start gap-3 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <div className="h-2 w-2 mt-1.5 rounded-full bg-primary-400" />
          <div>
            <h4 className="text-sm font-semibold text-primary-300">Deployment Successful</h4>
            <p className="text-xs text-slate-400">Your branch main was successfully deployed to production.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
