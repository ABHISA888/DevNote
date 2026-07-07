/**
 * 🎓 TEACHING MOMENT: CompletionCard.jsx
 *
 * WHY THIS EXISTS:
 * The circular progress ring + module bars give engineers an at-a-glance
 * understanding of "how done is this project?" — a question asked dozens of
 * times per day in stand-ups, code reviews, and stakeholder meetings.
 * ClickUp, Jira, and Linear all have equivalent progress visualizations.
 *
 * IMPLEMENTATION DETAIL — Pure SVG Ring:
 * We use the SVG strokeDasharray/strokeDashoffset technique:
 *   - circumference = 2 * π * radius = 2 * 3.14159 * 36 ≈ 226.19
 *   - offset = circumference * (1 - progress/100)
 * This is the same approach used by most charting libraries internally.
 * No external dependency needed.
 */

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularProgress({ percent }) {
  const offset = CIRCUMFERENCE * (1 - percent / 100);
  return (
    <div className="relative flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        {/* Track */}
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        {/* Progress arc */}
        <circle
          cx="50" cy="50" r={RADIUS}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      {/* Center label */}
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-extrabold text-slate-800">{percent}%</span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">TASKS</span>
      </div>
    </div>
  );
}

function ModuleBar({ name, progress, color }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-700">{name}</span>
        <span className="text-slate-500">{progress}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CompletionCard({ overallPercent, modules }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-800">Completion Status</h2>

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        {/* Circular ring */}
        <div className="shrink-0">
          <CircularProgress percent={overallPercent} />
        </div>

        {/* Module bars */}
        <div className="flex-1 w-full space-y-4">
          {modules.map((mod) => (
            <ModuleBar key={mod.id} name={mod.name} progress={mod.progress} color={mod.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
