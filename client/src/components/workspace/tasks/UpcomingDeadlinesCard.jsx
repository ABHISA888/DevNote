import { Calendar } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: UpcomingDeadlinesCard.jsx
 * 
 * WHY THIS EXISTS:
 * Highlighting critical schedules inside the tasks module keeps developers informed of immediate
 * requirements (e.g. Safari Navbar Fix Due Today).
 */
export default function UpcomingDeadlinesCard({ deadlines }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Upcoming Deadlines</h3>
        <Calendar size={14} className="text-primary-600" />
      </div>

      <div className="space-y-3.5">
        {deadlines.map((dl) => (
          <div key={dl.id} className="relative pl-3 border-l-2 border-primary-500">
            <span className={`text-[10px] font-bold block ${dl.colorClass || 'text-slate-400'}`}>
              {dl.time}
            </span>
            <span className="text-xs font-extrabold text-slate-800 block leading-tight mt-0.5">
              {dl.taskName}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">
              {dl.label}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full text-center text-[10px] font-bold text-primary-600 hover:text-primary-700 transition pt-1">
        View Full Timeline
      </button>
    </div>
  );
}
