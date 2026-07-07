/**
 * 🎓 TEACHING MOMENT: StatusBadge.jsx
 *
 * WHY THIS EXISTS:
 * Status is the most-read field in any project management tool. Linear uses colored
 * circles, Jira uses colored rectangles, and our design uses outlined pill badges.
 * Isolating this ensures every status transition is visually consistent.
 *
 * FUTURE INTEGRATION:
 * The `status` string will map 1-to-1 to backend enum values:
 *   "TODO" | "IN_PROGRESS" | "DONE"
 */

import { CheckCircle2 } from 'lucide-react';

const CONFIG = {
  TODO:        { label: 'TODO',        classes: 'bg-slate-50 text-slate-500 border-slate-200', icon: '⊟', useIcon: false },
  IN_PROGRESS: { label: 'IN PROGRESS', classes: 'bg-violet-50 text-violet-600 border-violet-200', icon: '↺', useIcon: false },
  DONE:        { label: 'DONE',        classes: 'bg-blue-50 text-blue-600 border-blue-100',    icon: null, useIcon: true },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] ?? CONFIG.TODO;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      {cfg.useIcon
        ? <CheckCircle2 size={11} strokeWidth={2.5} />
        : <span className="text-xs leading-none opacity-70">{cfg.icon}</span>
      }
      {cfg.label}
    </span>
  );
}
