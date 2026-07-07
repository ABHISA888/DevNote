/**
 * 🎓 TEACHING MOMENT: ActivityItem.jsx
 * 
 * WHY THIS EXISTS:
 * Represents a single row in an activity feed or timeline. 
 * By extracting it, we ensure uniform spacing, line-heights, and icon sizing across the feed.
 */
export default function ActivityItem({ 
  title, 
  time, 
  category, 
  icon: Icon, 
  iconBg, 
  iconColor,
  isLast 
}) {
  return (
    <div className="relative flex items-start gap-4 pb-6 last:pb-0">
      {/* Timeline connector line (hidden on the last item) */}
      {!isLast && (
        <div className="absolute left-4 top-10 -ml-px h-[calc(100%-1rem)] w-0.5 bg-gray-100" />
      )}

      {/* Status Icon */}
      <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor} ring-4 ring-white`}>
        <Icon size={14} strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex flex-col pt-1">
        <span className="text-sm font-medium text-slate-700">{title}</span>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <span>{time}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
