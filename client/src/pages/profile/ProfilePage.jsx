export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
        <p className="text-slate-400">Manage your developer profile and public information.</p>
      </div>

      <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 max-w-xl space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-xl font-bold text-primary-400">
            DL
          </div>
          <div>
            <h3 className="text-lg font-semibold">DevLaunch Architect</h3>
            <p className="text-sm text-slate-400">developer@devlaunch.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
