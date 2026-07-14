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
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">DONE</span>
      </div>
    </div>
  );
}

function ModuleBar({ name, progress, color }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
        <span className="text-slate-500">{name}</span>
        <span className="text-slate-700">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CompletionCard({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const inReview = tasks.filter(t => t.status === 'In Review').length;
  const todo = tasks.filter(t => t.status === 'Todo').length;

  const overallPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const modules = total > 0 ? [
    { id: 'completed', name: 'Completed Tasks', progress: Math.round((completed / total) * 100), color: 'bg-emerald-500' },
    { id: 'inprogress', name: 'In Progress Tasks', progress: Math.round((inProgress / total) * 100), color: 'bg-indigo-500' },
    { id: 'inreview', name: 'In Review Tasks', progress: Math.round((inReview / total) * 100), color: 'bg-amber-500' },
    { id: 'todo', name: 'Todo Tasks', progress: Math.round((todo / total) * 100), color: 'bg-slate-400' },
  ].filter(mod => mod.progress > 0) : [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-800">Completion Status</h2>

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        {/* Circular ring or Empty state */}
        <div className="shrink-0 flex items-center justify-center">
          {total > 0 ? (
            <CircularProgress percent={overallPercent} />
          ) : (
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-200 bg-slate-50/50 p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-normal">
                No Tasks Created
              </span>
            </div>
          )}
        </div>

        {/* Module bars */}
        <div className="flex-1 w-full space-y-4">
          {total > 0 ? (
            modules.map((mod) => (
              <ModuleBar key={mod.id} name={mod.name} progress={mod.progress} color={mod.color} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6 h-full">
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Add milestones or task items to start calculating completion progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
