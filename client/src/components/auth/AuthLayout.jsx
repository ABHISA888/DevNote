import { Shield, Check, Clock, Layers } from 'lucide-react';

/**
 * AuthLayout component
 * 
 * WHY it exists:
 * Shared split-screen template for both Login and Signup screens.
 * Centralizes layout grids, responsiveness breakpoints, ambient glows,
 * trust badges, and footers.
 * 
 * DESIGN SPEC (Matching screenshot 2):
 * Left panel is light-themed (light slate background) and positioned higher up
 * (`justify-start pt-28`) with custom border boxes for icons.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#eef0f8]">
      {/* ── LEFT PANEL: Value Proposition (Desktop Only) ── */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-start pt-28 pb-16 bg-gradient-to-b from-[#f8f9fe] to-[#ecf0fc] text-slate-800 px-16 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-md space-y-10 relative z-10 text-left">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-950">
              Start Building Smarter.
            </h1>
            <p className="text-xs leading-relaxed text-slate-500 font-medium max-w-sm">
              The unified workspace for engineering teams to organize architectural decisions,
              track sprint tasks, and manage API documentation in one place.
            </p>
          </div>

          {/* Features check list */}
          <div className="space-y-5">
            {[
              { title: 'Organize every project', icon: Check },
              { title: 'Track tasks & deadlines', icon: Clock },
              { title: 'Store APIs & documentation', icon: Layers },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm text-indigo-600">
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{f.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Active Card Context ── */}
      <div className="flex flex-1 flex-col items-center justify-start pt-16 lg:pt-24 px-4 pb-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-[420px] space-y-6">
          {children}

          {/* Security Shield Trust Badge */}
          <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-[#f4f6fc] p-4 text-left shadow-sm">
            <Shield size={16} className="mt-0.5 text-indigo-500 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              Your account and project data are securely protected using modern authentication
              and encrypted storage.
            </p>
          </div>

          {/* Footer Navigation links */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}
