/**
 * 🎓 TEACHING MOMENT: PriorityBadge.jsx
 *
 * WHY THIS EXISTS:
 * Apps like Linear and Jira show priority visually so engineers can scan a long list
 * in under a second. By making this a standalone component, we guarantee that
 * "HIGH" always looks exactly the same — whether it's in the table row, a modal,
 * or a Kanban card.
 *
 * FUTURE INTEGRATION:
 * The `priority` prop will come directly from the API response field like:
 *   task.priority → "HIGH" | "MEDIUM" | "LOW"
 */

const CONFIG = {
  HIGH:   { label: 'HIGH',   classes: 'bg-red-100 text-red-600 border-red-200',     icon: '!' },
  MEDIUM: { label: 'MEDIUM', classes: 'bg-blue-50 text-blue-600 border-blue-100',   icon: '⚌' },
  LOW:    { label: 'LOW',    classes: 'bg-slate-100 text-slate-500 border-slate-200', icon: '—' },
};

export default function PriorityBadge({ priority }) {
  const cfg = CONFIG[priority] ?? CONFIG.MEDIUM;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      <span className="font-extrabold leading-none">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
