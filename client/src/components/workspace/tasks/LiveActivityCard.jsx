import { Activity } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: LiveActivityCard.jsx
 * 
 * WHY THIS EXISTS:
 * Real-time event logging keeps developers updated on collaborative changes instantly.
 */
export default function LiveActivityCard({ activities }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Live Activity</h3>
        <Activity size={14} className="text-indigo-600" />
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div key={act.id} className="text-[11px] leading-relaxed text-slate-500 font-semibold border-b border-gray-50 pb-2 last:border-0 last:pb-0">
            {act.message}
          </div>
        ))}
      </div>
    </div>
  );
}
