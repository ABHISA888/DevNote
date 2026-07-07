/**
 * 🎓 TEACHING MOMENT: TaskSnapshotCard.jsx
 *
 * WHY THIS EXISTS:
 * A quick numeric overview of the task board. Engineers can see at a glance
 * "how much is left?" without switching to the Tasks tab. Linear uses this in
 * the project sidebar, Jira shows it as a sprint burndown widget, GitHub shows
 * open vs closed issue counts on the repo homepage.
 */
export default function TaskSnapshotCard({ snapshot }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Tasks Snapshot
      </h3>

      <div className="flex items-start justify-between gap-2">
        {snapshot.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center flex-1">
            <span className={`text-2xl font-extrabold ${item.color}`}>{item.value}</span>
            <span className="mt-1 text-[10px] font-semibold text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
