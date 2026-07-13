import { Pin, Rocket, Star } from 'lucide-react';
import ProjectActionMenu from './ProjectActionMenu';

export default function PinnedProjectCard({
  project,
  onEdit,
  onDelete,
  onPinToggle,
  onFavoriteToggle,
}) {
  if (!project) return null;

  const {
    name: title = '',
    description = '',
    techStack: badges = [],
    isPinned = false,
    isFavorite = false,
  } = project;

  const Icon = Rocket;
  const iconBg = 'bg-indigo-50';
  const iconColor = 'text-indigo-600';

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-primary-100 hover:shadow-md h-full">
      {/* Top-right: star + pin + action menu */}
      <div className="absolute right-3 top-3 flex items-center gap-1 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle && onFavoriteToggle(project._id || project.id);
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle && onPinToggle(project._id || project.id);
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

      <div>
        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <h3 className="text-base font-bold text-slate-800 pr-10">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">{description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <span key={badge} className="rounded bg-primary-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-600">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
