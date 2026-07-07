import { useParams } from 'react-router-dom';

const tabs = ['Overview', 'Tasks', 'Notes', 'APIs', 'Env', 'Deployments'];

export default function WorkspacePage() {
  const { workspaceId } = useParams();

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Active Workspace</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {workspaceId
              ? workspaceId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
              : 'My Workspace'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Workspace ID:{' '}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-indigo-300">
              {workspaceId || 'default'}
            </code>
          </p>
        </div>

        <button className="mt-4 self-start rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:mt-0 sm:self-auto">
          + Invite Member
        </button>
      </div>

      {/* ── Tab nav ────────────────────────── */}
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60 p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`flex-shrink-0 rounded-md px-4 py-1.5 text-sm font-medium transition ${
              i === 0
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Workspace board (placeholder) ──── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {['To Do', 'In Progress', 'Done'].map((col) => (
          <div key={col} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {col}
              </h3>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                {col === 'To Do' ? 3 : col === 'In Progress' ? 2 : 4}
              </span>
            </div>
            <div className="space-y-2">
              {Array.from({ length: col === 'To Do' ? 3 : col === 'In Progress' ? 2 : 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3 text-xs text-slate-400"
                >
                  <div className="mb-1.5 h-2 w-3/4 rounded bg-slate-700" />
                  <div className="h-1.5 w-1/2 rounded bg-slate-700/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
