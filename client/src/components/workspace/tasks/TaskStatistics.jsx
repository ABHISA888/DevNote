export default function TaskStatistics({ stats }) {
  // Ensure we display Total Tasks, Todo, In Progress, Review, Completed
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map((stat) => (
        <div 
          key={stat.id}
          className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{stat.label}</span>
          <span className={`text-2xl font-extrabold ${stat.valueColor || 'text-slate-800'}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
