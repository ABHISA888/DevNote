import { useNavigate } from 'react-router-dom';

/**
 * 🎓 TEACHING MOMENT: PinnedProjectCard.jsx
 * 
 * WHY THIS EXISTS:
 * Displays priority projects at a glance in the right sidebar column.
 * It's small, dense, and uses tech badges for quick recognition.
 */
export default function PinnedProjectCard({ id, title, badges, progressPercent }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => id && navigate(`/project/${id}`)}
      className="group rounded-xl border border-gray-100 bg-white p-4 transition hover:border-primary-200 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        
        {/* Tech Badges */}
        <div className="flex gap-1.5">
          {badges.map((badge) => (
            <span 
              key={badge} 
              className="rounded bg-primary-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-600"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-1.5 w-[75%] overflow-hidden rounded-full bg-gray-100">
          <div 
            className="h-full rounded-full bg-primary-600 transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          {progressPercent}%
        </span>
      </div>
    </div>
  );
}
