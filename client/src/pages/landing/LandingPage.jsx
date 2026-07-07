export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent sm:text-6xl">
        DevLaunch
      </h1>
      <p className="mt-6 text-lg text-slate-400 max-w-2xl">
        The ultimate workspace for developers. Manage your projects, notes, API tests, and deployments in one unified dashboard.
      </p>
      <div className="mt-10 flex gap-4">
        <a
          href="/signup"
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium transition-all"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
