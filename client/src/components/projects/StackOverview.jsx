function ProgressBar({ progress, colorClass = 'bg-primary-600' }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-slate-100 h-1">
      <div className={`h-full rounded-full transition-all duration-500 ${colorClass}`} style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function StackOverview({ data }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-slate-800">Stack Overview</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id}>
            <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-600">{item.language}</span>
              <span className="text-slate-800">{item.percentage}%</span>
            </div>
            <ProgressBar progress={item.percentage} colorClass={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
