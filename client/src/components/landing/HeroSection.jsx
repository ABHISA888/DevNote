import { Link } from 'react-router-dom';
import { CheckCircle, Users, GitBranch } from 'lucide-react';

/**
 * WHY THIS SECTION EXISTS:
 * The Hero is the most valuable real estate on any SaaS landing page.
 * Its job is to communicate the value proposition in under 5 seconds
 * and convert visitors into signups. Every word and pixel matters.
 *
 * LAYOUT DECISION (Two-column):
 * Left = message (what + why). Right = proof (what it looks like).
 * This pattern is used by Linear, Vercel, and Stripe because it lets
 * the visitor read the pitch while simultaneously seeing the product.
 *
 * REACT CONCEPT: Pure presentational component — no state, no side effects.
 * All it does is render JSX. This is the most common React component type.
 *
 * TAILWIND:
 * - `lg:grid-cols-2` splits to two columns only on large screens.
 * - `order-first/order-last` swaps column order on mobile.
 * - `bg-gradient-to-br` creates diagonal gradient backgrounds.
 */

/* ── Dashboard card mock (right side illustration) ── */
function DashboardCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-indigo-100/50">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex gap-3">
          <button className="text-xs font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-1">
            Workspaces
          </button>
          <button className="text-xs font-medium text-gray-400 pb-1">Tasks</button>
          <button className="text-xs font-medium text-gray-400 pb-1">Docs</button>
        </div>
      </div>

      {/* Active Projects header */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs font-semibold text-gray-600">Active Projects</span>
        {/* Toggle */}
        <div className="flex h-5 w-9 items-center rounded-full bg-indigo-600 px-0.5">
          <div className="h-4 w-4 rounded-full bg-white shadow-sm translate-x-4" />
        </div>
      </div>

      {/* Project rows */}
      <div className="space-y-1 px-5 pb-3">
        {[
          { name: 'Project A', progress: 72, color: 'bg-indigo-500' },
          { name: 'Project B', progress: 45, color: 'bg-violet-400' },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
            <div className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
            <span className="flex-1 text-xs font-medium text-gray-700">{p.name}</span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
              <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.progress}%` }} />
            </div>
            <span className="text-[10px] text-gray-400">{p.progress}%</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-dashed border-gray-100" />

      {/* Critical tasks */}
      <div className="px-5 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Critical Tasks
        </span>
        <div className="mt-2 space-y-1.5">
          {[
            'Update API authentication before staging deploy',
            'Update env variables for staging env',
          ].map((task, i) => (
            <div key={i} className="flex items-start gap-2 rounded-md bg-red-50 px-3 py-2">
              <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
              <span className="text-[11px] text-gray-600 leading-tight">{task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats badge */}
      <div className="m-5 mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
        <div>
          <div className="text-xs text-gray-400">Team Velocity</div>
          <div className="text-lg font-bold text-gray-800">+128%</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-200">
          ↑
        </div>
      </div>
    </div>
  );
}

const stats = [
  { icon: CheckCircle, label: '10k+ Users Contributed' },
  { icon: GitBranch, label: 'Open Source Friendly' },
  { icon: Users, label: 'Free for Students' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/40"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Copy ── */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
              Plan. Build. Ship.
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-500 lg:mx-0 lg:text-lg">
              The ultimate high-performance workspace for developer teams.
              Integrate your stack, manage complex tasks, and deploy at the
              speed of thought.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Get Started Free
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  ▶
                </span>
                View Demo
              </button>
            </div>

            {/* Stat badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {stats.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon size={13} className="text-indigo-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard illustration ── */}
          <div className="flex justify-center lg:justify-end">
            <DashboardCard />
          </div>
        </div>
      </div>
    </section>
  );
}
