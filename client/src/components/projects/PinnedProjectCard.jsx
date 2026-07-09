import { Pin, Rocket } from 'lucide-react';
import ProjectActionMenu from './ProjectActionMenu';

export default function PinnedProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  if (!project) return null;

  const {
    name: title = '',
    description = '',
    techStack: badges = [],
    isFavorite: isPinned = false,
  } = project;

  const Icon = Rocket;
  const iconBg = 'bg-indigo-50';
  const iconColor = 'text-indigo-600';

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-primary-100 hover:shadow-md h-full">
      {/* Top-right: pin + action menu */}
      <div className="absolute right-3 top-3 flex items-center gap-0.5">
        <Pin
          size={14}
          className={`transition-colors ${isPinned ? 'fill-primary-600 text-primary-600' : 'text-gray-300 group-hover:text-gray-400'}`}
        />
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
