import DeadlineCard from './DeadlineCard';
import { UPCOMING_DEADLINES } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: UpcomingDeadlines.jsx
 * 
 * WHY THIS EXISTS:
 * Serves as a section container with a standardized header ("Upcoming Deadlines" and "View all").
 * It abstracts away the data mapping.
 */
export default function UpcomingDeadlines() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Upcoming Deadlines</h2>
        <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">
          View all
        </a>
      </div>
      
      <div className="flex flex-col gap-4">
        {UPCOMING_DEADLINES.map((deadline) => (
          <DeadlineCard key={deadline.id} {...deadline} />
        ))}
      </div>
    </div>
  );
}
