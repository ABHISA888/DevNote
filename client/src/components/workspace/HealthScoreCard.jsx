import { ShieldCheck } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: HealthScoreCard.jsx
 *
 * WHY THIS EXISTS:
 * Health scores aggregate multiple signals (CI status, test coverage, open PR age,
 * deployment frequency) into one human-readable rating. Vercel does this for
 * performance, GitHub does it for dependency security, Linear does it for project
 * velocity. It gives managers and leads a single number to track.
 *
 * The dark indigo background makes this the most visually prominent sidebar card,
 * communicating "this is the most important status signal."
 */
export default function HealthScoreCard({ score, riskLabel, docsStatus }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-indigo-700 p-5 text-white shadow-lg shadow-indigo-700/30">
      {/* Decorative circles */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -right-2 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
            Health Score
          </span>
          <ShieldCheck size={16} className="text-indigo-300" />
        </div>

        {/* Score */}
        <p className="text-2xl font-extrabold text-white">{score}</p>
        <p className="mt-1 text-xs font-semibold text-indigo-300">{riskLabel}</p>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Docs Status */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
            DOCS STATUS
          </span>
          <span className="text-sm font-bold text-white">{docsStatus}</span>
        </div>
      </div>
    </div>
  );
}
