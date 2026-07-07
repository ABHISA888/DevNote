import { History } from 'lucide-react';
import { RECENTLY_EDITED } from '../../constants/projectsData';

function RecentItem({ title, time, initials, color }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 last:pb-0">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <span className="text-xs font-bold tracking-wider">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate">{title}</h4>
        <p className="text-[10px] font-semibold text-slate-400">{time}</p>
      </div>
    </div>
  );
}

export default function RecentlyEdited() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2 text-indigo-600">
        <History size={16} strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-slate-800">Recently Edited</h3>
      </div>
      <div className="flex flex-col gap-1">
        {RECENTLY_EDITED.map((item) => (
          <RecentItem key={item.id} {...item} />
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg border border-gray-200 bg-white py-2 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
        View History
      </button>
    </div>
  );
}
