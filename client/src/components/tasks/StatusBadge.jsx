import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: StatusBadge.jsx
 * Visual indicators for task status transitions (Todo, In Progress, Review, Completed).
 */

const CONFIG = {
  TODO:        { label: 'TODO',        classes: 'bg-slate-50 text-slate-500 border-slate-200', icon: '⊟' },
  IN_PROGRESS: { label: 'IN PROGRESS', classes: 'bg-indigo-50 text-indigo-600 border-indigo-200', icon: '↺' },
  REVIEW:      { label: 'REVIEW',      classes: 'bg-amber-50 text-amber-600 border-amber-200', icon: '👁' },
  COMPLETED:   { label: 'COMPLETED',   classes: 'bg-emerald-50 text-emerald-600 border-emerald-200', isCheck: true },
};

export default function StatusBadge({ status }) {
  const normalized = (status || 'Todo').toUpperCase().replace(/\s+/g, '_');
  let key = normalized;
  if (normalized === 'DONE') key = 'COMPLETED';
  if (normalized === 'IN_REVIEW') key = 'REVIEW';

  const cfg = CONFIG[key] ?? CONFIG.TODO;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      {cfg.isCheck ? (
        <CheckCircle2 size={11} strokeWidth={2.5} />
      ) : (
        <span className="text-xs leading-none opacity-70">{cfg.icon}</span>
      )}
      {cfg.label}
    </span>
  );
}
