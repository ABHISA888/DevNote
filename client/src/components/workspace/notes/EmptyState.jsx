import { FileText, ArrowLeft } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: EmptyState.jsx
 * 
 * WHY THIS EXISTS:
 * When no note is selected or the notes list is empty, an empty state guides the user
 * on what to do next (e.g. "Select a note or create a new one").
 */
export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#f8f9fe]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 mb-4 shadow-sm border border-indigo-100">
        <FileText size={32} />
      </div>
      <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">No Note Selected</h2>
      <p className="mt-2 text-sm font-medium text-slate-500 max-w-xs text-center flex items-center justify-center gap-2">
        <ArrowLeft size={16} className="text-slate-400" />
        Select a note from the sidebar or create a new one to start writing.
      </p>
    </div>
  );
}
