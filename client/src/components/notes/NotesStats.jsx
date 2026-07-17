import { FileText, Pin, Clock, Star } from 'lucide-react';

const ICONS = {
  FileText,
  Pin,
  Clock,
  Star
};

export default function NotesStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon] || FileText;
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
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${stat.colorClass}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
