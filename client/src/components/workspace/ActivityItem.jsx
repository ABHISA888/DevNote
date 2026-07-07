/**
 * 🎓 TEACHING MOMENT: ActivityItem.jsx
 *
 * WHY THIS EXISTS:
 * Activity feeds are a staple of every collaborative SaaS (GitHub, Linear, Notion).
 * Each event has a consistent layout: icon → text → timestamp.
 * Extracting this to an atomic component means the feed can scale from 3 items
 * to 300 without any structural changes.
 *
 * FUTURE BACKEND:
 *   GET /api/projects/:id/activity?limit=10
 * Returns an array with the same shape as RECENT_ACTIVITY in workspaceData.js
 */
export default function ActivityItem({ icon: Icon, iconBg, iconColor, title, highlight, isCode, time }) {
  return (
    <div className="flex items-start gap-3">
      {/* Icon chip */}
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon size={15} className={iconColor} strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 leading-snug">
          {title}{' '}
          {highlight && (
            isCode
              ? <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono font-bold text-slate-700">{highlight}</code>
              : <span className="font-semibold text-indigo-600">{highlight}</span>
          )}
        </p>
        <p className="mt-0.5 text-[11px] font-semibold text-slate-400">{time}</p>
      </div>
    </div>
  );
}
