export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-slate-800/50 border border-slate-700/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-400 text-sm">Join DevLaunch and start shipping faster</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button className="w-full py-3 mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold transition-all shadow-lg shadow-indigo-500/20">
            Get Started
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
