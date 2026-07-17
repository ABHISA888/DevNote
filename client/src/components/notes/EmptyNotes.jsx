import { FileText, Plus } from 'lucide-react';

export default function EmptyNotes({ onAdd }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50/60 px-8 py-16 text-center">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
        <FileText size={28} className="text-indigo-300" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-xs">
        <h3 className="text-base font-extrabold text-slate-700">No Notes Yet</h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          Start writing your ideas, reminders, and snippets.
        </p>
      </div>

      {/* CTA */}
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} />
          Create Note
        </button>
      )}
    </div>
  );
}
