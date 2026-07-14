import { Star, GitFork, AlertCircle, Eye, GitBranch, Calendar, Github } from 'lucide-react';

export default function GithubStatsCard({ stats, githubUrl }) {
  if (!githubUrl || !stats) return null;

  const statItems = [
    { label: 'Stars', value: stats.stars || 0, icon: Star, color: 'text-amber-500 bg-amber-50' },
    { label: 'Forks', value: stats.forks || 0, icon: GitFork, color: 'text-blue-500 bg-blue-50' },
    { label: 'Open Issues', value: stats.openIssues || 0, icon: AlertCircle, color: 'text-rose-500 bg-rose-50' },
    { label: 'Watchers', value: stats.watchers || 0, icon: Eye, color: 'text-purple-500 bg-purple-50' },
  ];

  const formattedDate = stats.lastUpdated
    ? new Date(stats.lastUpdated).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Github size={16} className="text-slate-700" />
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          GitHub Repository Stats
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-slate-100 p-3 flex flex-col gap-1.5 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                <span className={`p-1 rounded-lg ${item.color}`}>
                  <Icon size={12} />
                </span>
              </div>
              <span className="text-base font-extrabold text-slate-800">{item.value.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <GitBranch size={13} className="text-slate-400" />
            <span>Default Branch</span>
          </div>
          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
            {stats.defaultBranch || 'main'}
          </span>
        </div>

        {formattedDate && (
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-slate-400" />
              <span>Last Updated</span>
            </div>
            <span className="font-bold text-slate-700">{formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
