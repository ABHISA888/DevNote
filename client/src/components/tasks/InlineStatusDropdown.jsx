import { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const STATUSES = [
  { value: 'TODO',        label: 'Todo',        color: 'text-slate-500', dot: 'bg-slate-400' },
  { value: 'IN PROGRESS', label: 'In Progress',  color: 'text-indigo-600', dot: 'bg-indigo-500' },
  { value: 'REVIEW',      label: 'Review',       color: 'text-purple-600', dot: 'bg-purple-500' },
  { value: 'COMPLETED',   label: 'Completed',    color: 'text-emerald-600', dot: 'bg-emerald-500' },
];

const BADGE_CONFIG = {
  'TODO':        { label: 'TODO',        classes: 'bg-slate-50  text-slate-500  border-slate-200' },
  'IN PROGRESS': { label: 'IN PROGRESS', classes: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  'REVIEW':      { label: 'REVIEW',      classes: 'bg-purple-50 text-purple-600 border-purple-200' },
  'COMPLETED':   { label: 'COMPLETED',   classes: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
};

export default function InlineStatusDropdown({ status, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const key = (status || 'TODO').toUpperCase();
  const cfg = BADGE_CONFIG[key] ?? BADGE_CONFIG['TODO'];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition hover:brightness-95 cursor-pointer ${cfg.classes}`}
      >
        {cfg.label}
        <ChevronDown size={10} className="opacity-60" />
      </button>

      {open && (
        <div
          className="absolute left-0 z-50 mt-1.5 w-36 origin-top-left rounded-lg border border-gray-100 bg-white shadow-lg shadow-slate-900/10"
          style={{ animation: 'dropdownIn 150ms ease' }}
        >
          <div className="py-1">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                onClick={() => { onStatusChange(s.value); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold transition hover:bg-slate-50 ${s.color} ${status === s.value ? 'bg-slate-50' : ''}`}
              >
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.label}
                {status === s.value && <CheckCircle2 size={12} className="ml-auto opacity-70" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: scale(0.95) translateY(-4px) }
          to   { opacity: 1; transform: scale(1)    translateY(0) }
        }
      `}</style>
    </div>
  );
}
