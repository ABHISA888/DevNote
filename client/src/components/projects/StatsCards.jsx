import { PROJECT_STATS } from '../../constants/projectsData';
import { Star } from 'lucide-react';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mb-8">
      {PROJECT_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md">
            <h3 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">{stat.label}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-extrabold leading-none ${stat.valueColor || 'text-slate-800'}`}>{stat.value}</span>
              {Icon && <Icon size={16} className={`${stat.iconColor} ${stat.fill ? 'fill-current' : ''}`} strokeWidth={2.5} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
