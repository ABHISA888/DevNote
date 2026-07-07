import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Calendar } from 'lucide-react';

function ProgressBar({ progress }) {
  const color = progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600';
  return (
    <div className="w-full overflow-hidden rounded-full bg-slate-100 h-1.5">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${progress}%` }} />
    </div>
  );
}

function StatusBadge({ status, statusColor }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>{status}</span>
  );
}

export default function ProjectCard({ id, title, initials, initialsColor, lastUpdated, isFavorite, description, badges, progress, members, additionalMembers, status, statusColor }) {
  const navigate = useNavigate();
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${initialsColor}`}>
              <span className="text-sm font-bold tracking-wider">{initials}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{title}</h3>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                <Calendar size={12} /><span>{lastUpdated}</span>
              </div>
            </div>
          </div>
          <button className="text-gray-300 transition hover:text-indigo-400">
            <Star size={16} className={isFavorite ? 'fill-indigo-600 text-indigo-600' : ''} />
          </button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500 line-clamp-3 h-12">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 h-6">
          {badges.map((badge) => (
            <span key={badge} className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{badge}</span>
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500">Progress</span>
            <span className="text-indigo-600">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {members.map((member) => (
                <img key={member.id} src={member.avatar} alt="Member" className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
              ))}
              {additionalMembers > 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-500">+{additionalMembers}</div>
              )}
            </div>
            <StatusBadge status={status} statusColor={statusColor} />
          </div>
          <button onClick={() => navigate(`/project/${id}`)} className="group/btn flex items-center gap-1 text-[11px] font-bold text-indigo-600 transition hover:text-indigo-700">
            Open Project <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
