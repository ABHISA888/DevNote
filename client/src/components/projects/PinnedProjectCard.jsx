import { Pin } from 'lucide-react';

export default function PinnedProjectCard({ title, description, badges, icon: Icon, iconBg, iconColor, isPinned }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md h-full">
      <div className="absolute right-4 top-4">
        <Pin size={16} className={`transition-colors ${isPinned ? 'fill-indigo-600 text-indigo-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
      </div>
      <div>
        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">{description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <span key={badge} className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600">{badge}</span>
        ))}
      </div>
    </div>
  );
}
