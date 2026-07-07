import ActivityItem from './ActivityItem';
import { RECENT_ACTIVITY } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: RecentActivity.jsx
 * 
 * WHY THIS EXISTS:
 * Container for the Activity feed. It iterates over the recent activity data and passes the 
 * `isLast` prop to the final item so the vertical timeline line doesn't extend infinitely.
 */
export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
      </div>
      
      <div className="flex flex-col">
        {RECENT_ACTIVITY.map((activity, idx) => (
          <ActivityItem 
            key={activity.id} 
            {...activity} 
            isLast={idx === RECENT_ACTIVITY.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}
