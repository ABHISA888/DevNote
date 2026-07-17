import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2, Copy } from 'lucide-react';
import { METHOD_COLORS } from '../../../constants/apiData';

function MethodBadge({ method }) {
  const c = METHOD_COLORS[method] || METHOD_COLORS.GET;
  return (
    <span className={`shrink-0 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest ${c.bg} ${c.text}`}>
      {method}
    </span>
  );
}

function ThreeDotMenu({ onEdit, onDelete, onDuplicate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreHorizontal size={15} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              <Pencil size={13} className="text-slate-400" /> Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              <Copy size={13} className="text-slate-400" /> Duplicate
            </button>
            <div className="h-px bg-gray-100 mx-2" />
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function EndpointList({ endpoints, selectedId, onSelect, onEdit, onDelete, onDuplicate }) {
  if (!endpoints || endpoints.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {endpoints.map((ep) => {
        const isActive = selectedId === ep.id;
        return (
          <div
            key={ep.id}
            onClick={() => onSelect(ep)}
            className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-150 hover:scale-[1.005] ${
              isActive
                ? 'border-indigo-200 bg-indigo-50/60 shadow-sm'
                : 'border-gray-200 bg-white shadow-sm hover:border-indigo-100 hover:shadow-md'
            }`}
          >
            <MethodBadge method={ep.method} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">{ep.name}</p>
              <p className="truncate text-[11px] font-mono font-medium text-slate-400">{ep.url}</p>
            </div>

            <ThreeDotMenu
              onEdit={() => onEdit(ep)}
              onDelete={() => onDelete(ep.id)}
              onDuplicate={() => onDuplicate(ep)}
            />
          </div>
        );
      })}
    </div>
  );
}
