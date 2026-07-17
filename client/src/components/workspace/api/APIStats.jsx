import { Box, Server, Share2, Zap } from 'lucide-react';
import { API_STATS } from '../../../constants/apiData';

const ICONS = { box: Box, server: Server, share2: Share2, zap: Zap };

const ACCENT = {
  'text-indigo-600': { bg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'text-indigo-600' },
  'text-slate-500':  { bg: 'bg-slate-50',  border: 'border-slate-100',  icon: 'text-slate-400'  },
};

export default function APIStats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
      {API_STATS.map((stat) => {
        const Icon  = ICONS[stat.icon] || Box;
        const style = ACCENT[stat.color] || ACCENT['text-slate-500'];
        const isPrimary = stat.id === 'total';

        return (
          <div
            key={stat.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
              <span className={`text-2xl font-black tracking-tight ${isPrimary ? 'text-indigo-600' : 'text-slate-800'}`}>
                {stat.value}
              </span>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${style.border} ${style.bg} ${style.icon}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
