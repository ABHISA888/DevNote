import ActivityItem from './ActivityItem';

/**
 * 🎓 TEACHING MOMENT: RecentActivity.jsx
 *
 * WHY THIS EXISTS:
 * Activity feeds answer "what has changed recently?" — the most-asked question
 * in any team product. GitHub's commit history, Linear's activity log, Notion's
 * page history — all serve this same purpose. It creates transparency and reduces
 * "what are you working on?" sync meetings.
 */
export default function RecentActivity({ activities }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
        <button className="text-xs font-bold text-primary-600 transition hover:text-primary-700">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
