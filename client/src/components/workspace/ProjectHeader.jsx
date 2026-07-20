import { useState, useRef, useEffect } from 'react';
import { Star, MoreHorizontal, Users, Pencil, Trash2 } from 'lucide-react';

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
export default function ProjectHeader({ 
  initials, 
  initialsColor, 
  name, 
  status, 
  description, 
  isFavorite, 
  onFavoriteToggle, 
  onOpenMembers,
  onOpenEditProject,
  onOpenDeleteProject
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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
        <button
          onClick={onFavoriteToggle}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${isFavorite ? 'border-primary-200 bg-primary-50 text-primary-600' : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <Star size={13} className={isFavorite ? 'fill-primary-600' : ''} />
        </button>
        <button
          onClick={onOpenMembers}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Users size={13} />
          Members
        </button>
        
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 text-slate-500 shadow-sm transition hover:bg-slate-50"
          >
            <MoreHorizontal size={16} />
          </button>

          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-gray-100 bg-white py-1 shadow-lg shadow-slate-900/10 z-50"
              style={{ animation: 'dropdownSlide 150ms ease' }}
            >
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onOpenMembers) onOpenMembers();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Users size={14} className="text-slate-400" />
                Invite Members
              </button>
              
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onOpenEditProject) onOpenEditProject();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil size={14} className="text-slate-400" />
                Edit Project
              </button>
              
              <div className="my-1 border-t border-gray-100"></div>
              
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onOpenDeleteProject) onOpenDeleteProject();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={14} className="text-red-400" />
                Delete Project
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes dropdownSlide {
          from { opacity: 0; transform: scale(0.95) translateY(-5px) }
          to   { opacity: 1; transform: scale(1)    translateY(0) }
        }
      `}</style>
    </div>
  );
}

