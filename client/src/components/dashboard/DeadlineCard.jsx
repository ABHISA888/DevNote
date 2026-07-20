import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * 🎓 TEACHING MOMENT: DeadlineCard.jsx
 * 
 * WHY THIS EXISTS:
 * Maps an upcoming deadline into a structured UI block. 
 * Includes a progress bar visualization.
 */
export default function DeadlineCard({ 
  id,
  title, 
  timeLabel, 
  timeColor, 
  progressPercent, 
  iconBg, 
  iconColor 
}) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => id && navigate(`/project/${id}`)}
      className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:shadow-md transition cursor-pointer"
    >
      {/* Left Icon Badge */}
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        <Clock size={20} strokeWidth={2.5} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <span className={`text-xs font-bold ${timeColor}`}>{timeLabel}</span>
        </div>
        
        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div 
              className="h-full rounded-full bg-primary-600" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {progressPercent}% Done
          </span>
        </div>
      </div>
    </div>
  );
}
