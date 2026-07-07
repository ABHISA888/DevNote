/**
 * 🎓 TEACHING MOMENT: TaskStats.jsx
 * 
 * WHY THIS EXISTS:
 * Providing high-level aggregate metrics at the top of a task board gives project managers
 * immediate visibility into project health without manually counting cards in columns.
 */
export default function TaskStats({ stats }) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {stats.map((stat) => (
        <div 
          key={stat.id}
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm min-w-[100px] flex-1 sm:flex-none"
        >
          {stat.isPercent ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-800">75%</span>
              <span className="text-sm font-bold text-slate-500">Done</span>
            </div>
          ) : (
            <>
              <span className="mb-1 text-xs font-bold text-slate-500 text-center">{stat.label}</span>
              <span className={`text-xl font-extrabold ${stat.valueColor || 'text-slate-800'}`}>
                {stat.value}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
