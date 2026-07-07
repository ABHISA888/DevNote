import { Lock } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: StatsCards.jsx
 * 
 * WHY THIS EXISTS:
 * Provides a high-level overview of the secrets vault. The "Hidden Values" card
 * emphasizes the security posture, assuring users that their tokens are masked.
 */
export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 mb-8">
      {stats.map((stat) => (
        <div 
          key={stat.id}
          className={`flex flex-col justify-center rounded-xl border border-gray-200 p-5 shadow-sm transition hover:shadow-md ${
            stat.isSecure ? 'bg-indigo-50/50 border-indigo-100' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
              stat.isSecure ? 'text-indigo-600' : 'text-slate-500'
            }`}>
              {stat.label}
            </span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black tracking-tight ${
              stat.isSecure ? 'text-indigo-900' : 'text-slate-800'
            }`}>
              {stat.value}
            </span>
            {stat.subtext && (
              <span className="text-[10px] font-bold text-indigo-600">{stat.subtext}</span>
            )}
            {stat.isSecure && (
              <Lock size={14} className="text-indigo-600 ml-1" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
