/**
 * 🎓 TEACHING MOMENT: ProjectStatCard.jsx
 *
 * WHY THIS EXISTS:
 * The 6 stats (Status, Progress, Tasks, Days Left, Stack, Updated) are displayed
 * in a uniform pill/card row — exactly like GitHub's repository stats strip or
 * Linear's project metadata bar. Each stat is identically shaped but has different
 * data. A reusable StatCard lets us render them all from a data array with zero
 * duplicate JSX.
 *
 * FUTURE BACKEND:
 * Each value will be derived from the API:
 *   project.status, project.progress, project.taskCount, project.daysLeft etc.
 */
export default function ProjectStatCard({ label, value, valueColor = 'text-slate-800' }) {
  return (
    <div className="flex flex-col gap-1 border-r border-gray-100 px-5 py-3 last:border-r-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <span className={`text-sm font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}
