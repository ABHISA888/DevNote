import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Calendar, Pin } from 'lucide-react';
import ProjectActionMenu from './ProjectActionMenu';

function ProgressBar({ progress }) {
  const color = progress === 100 ? 'bg-primary-500' : 'bg-primary-600';
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

export default function ProjectCard({
  id, title, initials, initialsColor, lastUpdated,
  isFavorite, isPinned, description, badges, progress,
  members, additionalMembers, status, statusColor,
  onEdit, onDelete, onPinToggle, onFavoriteToggle,
  // Pass the entire project object through for the action menu
  ...rest
}) {
  const navigate = useNavigate();
  // Reconstruct a project reference for the action menu
  const project = { id, title, initials, initialsColor, lastUpdated, isFavorite, isPinned, description, badges, progress, members, additionalMembers, status, statusColor, ...rest };
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-primary-100 hover:shadow-md">
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
          <div className="flex items-center gap-1">
            {/* Star Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle && onFavoriteToggle(id);
              }}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 focus:outline-none"
            >
              <Star
                size={14}
                className={`shrink-0 transition-colors ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-gray-400'
                }`}
              />
            </button>

            {/* Pin Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPinToggle && onPinToggle(id);
              }}
              title={isPinned ? "Unpin Project" : "Pin Project"}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 focus:outline-none"
            >
              <Pin
                size={14}
                className={`shrink-0 transition-colors ${
                  isPinned ? 'fill-primary-600 text-primary-600' : 'text-gray-300 hover:text-gray-400'
                }`}
              />
            </button>

            <ProjectActionMenu
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
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
            <span className="text-primary-600">{progress}%</span>
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
          <button onClick={() => navigate(`/project/${id}`)} className="group/btn flex items-center gap-1 text-[11px] font-bold text-primary-600 transition hover:text-primary-700">
            Open Project <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
