import DeadlineItem from './DeadlineItem';

/**
 * 🎓 TEACHING MOMENT: UpcomingDeadlines.jsx
 *
 * WHY THIS EXISTS:
 * Deadline visibility is the #1 pain point in project management. Linear surfaces
 * due dates prominently in the sidebar. Jira shows them in the sprint board.
 * GitHub Projects has a dedicated timeline view. Having deadlines on the overview
 * means engineers see them without navigating to a separate calendar.
 */
export default function UpcomingDeadlines({ deadlines }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-800">Upcoming Deadlines</h2>
      <div className="space-y-5">
        {deadlines.map((deadline) => (
          <DeadlineItem key={deadline.id} {...deadline} />
        ))}
      </div>
    </div>
  );
}
