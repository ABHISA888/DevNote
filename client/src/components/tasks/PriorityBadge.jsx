/**
 * 🎓 TEACHING MOMENT: PriorityBadge.jsx
 *
 * Visual indicators for task priority levels (Low, Medium, High, Critical).
 */

const CONFIG = {
  CRITICAL: { label: 'CRITICAL', classes: 'bg-red-100 text-red-700 border-red-300 font-extrabold', icon: '⚡' },
  HIGH:     { label: 'HIGH',     classes: 'bg-red-50 text-red-600 border-red-200',        icon: '!' },
  MEDIUM:   { label: 'MEDIUM',   classes: 'bg-blue-50 text-blue-600 border-blue-100',      icon: '⚌' },
  LOW:      { label: 'LOW',      classes: 'bg-slate-100 text-slate-500 border-slate-200', icon: '—' },
};

export default function PriorityBadge({ priority }) {
  const key = (priority || 'MEDIUM').toUpperCase();
  const cfg = CONFIG[key] ?? CONFIG.MEDIUM;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      <span className="leading-none">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
