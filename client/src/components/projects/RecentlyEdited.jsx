import { History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const themeColorMap = {
  '#6366f1': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  '#3b82f6': 'bg-blue-50 text-blue-700 border-blue-100',
  '#10b981': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '#f59e0b': 'bg-amber-50 text-amber-700 border-amber-100',
  '#ef4444': 'bg-red-50 text-red-700 border-red-100',
  '#ec4899': 'bg-pink-50 text-pink-700 border-pink-100',
  '#8b5cf6': 'bg-purple-50 text-purple-700 border-purple-100',
};

function RecentItem({ id, title, time, initials, color }) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/project/${id}`)}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-50 rounded-lg px-2 -mx-2 transition"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <span className="text-xs font-bold tracking-wider">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate">{title}</h4>
        <p className="text-[10px] font-semibold text-slate-400">{time}</p>
      </div>
    </div>
  );
}

export default function RecentlyEdited({ projects = [] }) {
  // Sort projects by updatedAt desc, slice top 3
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const getRelativeTime = (dateStr) => {
    const diffTime = new Date() - new Date(dateStr);
    const diffMins = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2 text-primary-600">
        <History size={16} strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-slate-800">Recently Edited</h3>
      </div>
      
      {recentProjects.length === 0 ? (
        <p className="text-xs font-semibold text-slate-400 py-2">No edited projects.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {recentProjects.map((p) => {
            const initials = p.name ? p.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : 'DP';
            const color = themeColorMap[p.themeColor] || 'bg-indigo-50 text-indigo-700 border-indigo-100';
            return (
              <RecentItem 
                key={p._id} 
                id={p._id}
                title={p.name} 
                time={getRelativeTime(p.updatedAt || p.createdAt)} 
                initials={initials} 
                color={color} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
