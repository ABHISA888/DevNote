import { Box, Server, Share2, Lock } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ApiStats.jsx
 * 
 * WHY THIS EXISTS:
 * High-level analytics immediately show the footprint of the backend architecture.
 * They help project managers and lead engineers quickly assess protocol distribution (REST vs GraphQL).
 */
export default function ApiStats({ stats }) {
  const icons = {
    Box,
    Server,
    Share2,
    Lock
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
      {stats.map((stat) => {
        const Icon = icons[stat.icon] || Box;
        return (
          <div 
            key={stat.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col">
              <span className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
              <span className="text-2xl font-black text-slate-800 tracking-tight">
                {stat.value}
              </span>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-gray-100 ${stat.color}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
