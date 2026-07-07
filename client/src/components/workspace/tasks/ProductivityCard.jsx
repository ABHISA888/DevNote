import { TrendingUp, Clock, Zap } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ProductivityCard.jsx
 * 
 * WHY THIS EXISTS:
 * Gamification (streaks, metrics) drives user engagement. Seeing average tasks completion time
 * motivates developer performance.
 */
export default function ProductivityCard({ streak, avgTime }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Productivity</h3>
        <Zap size={14} className="text-indigo-600" />
      </div>

      <div className="space-y-3.5">
        {/* Streak */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Week Streak</span>
            <span className="text-sm font-extrabold text-slate-800">{streak}</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <TrendingUp size={16} />
          </div>
        </div>

        {/* Avg Time */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Time / Task</span>
            <span className="text-sm font-extrabold text-slate-800">{avgTime}</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Clock size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
