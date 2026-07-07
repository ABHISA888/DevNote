/**
 * 🎓 TEACHING MOMENT: DeadlineItem.jsx
 *
 * WHY THIS EXISTS:
 * Each deadline is a small self-contained unit: a bullet, a title, and a date.
 * Isolating it lets the parent `UpcomingDeadlines` component stay clean while
 * mapping over arrays of any length. When deadlines come from an API, only the
 * parent's data source changes — this component is untouched.
 */
export default function DeadlineItem({ title, dueDate, isPrimary }) {
  return (
    <div className="flex items-start gap-3">
      {/* Timeline bullet */}
      <div className="mt-1.5 flex flex-col items-center">
        <div className={`h-2.5 w-2.5 rounded-full border-2 ${isPrimary ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400 bg-white'}`} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs font-medium text-slate-400">{dueDate}</p>
      </div>
    </div>
  );
}
