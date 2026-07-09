import { Star, Share2, MoreHorizontal } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ProjectHeader.jsx
 *
 * WHY THIS EXISTS:
 * Every SaaS project workspace has an identity block: icon, name, status,
 * description, and actions. Linear shows this at the top of every issue,
 * GitHub shows it on every repo, Notion shows it on every page.
 * It answers "what is this?" in under 3 seconds.
 *
 * FUTURE BACKEND:
 * This component will receive data from:
 *   const { data: project } = useFetchProject(projectId);
 * Then: <ProjectHeader {...project} onFavoriteToggle={...} />
 */
export default function ProjectHeader({ initials, initialsColor, name, status, description, isFavorite }) {
  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-0 sm:px-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        {/* Project Icon / Avatar */}
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-bold tracking-wider ${initialsColor} border-primary-100`}>
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">{name}</h1>
            {/* Status Badge */}
            <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-700">
              {status}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 self-start">
        <button className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${isFavorite ? 'border-primary-200 bg-primary-50 text-primary-600' : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'}`}>
          <Star size={13} className={isFavorite ? 'fill-primary-600' : ''} />
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
          <Share2 size={13} />
          Share
        </button>
        <button className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 text-slate-500 shadow-sm transition hover:bg-slate-50">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
