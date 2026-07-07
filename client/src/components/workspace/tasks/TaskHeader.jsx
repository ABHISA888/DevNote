import { Plus, Share2 } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskHeader.jsx
 * 
 * WHY THIS EXISTS:
 * This component acts as the local page header for the Tasks tab. It provides contextual
 * descriptions and the primary call-to-action (New Task) specific to the board, distinct from
 * the global project header.
 */
export default function TaskHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h2 className="text-sm font-extrabold text-slate-800">Task Board</h2>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Manage and track every task inside this project.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50">
          <Share2 size={14} /> Share
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700">
          <Plus size={14} strokeWidth={2.5} /> New Task
        </button>
      </div>
    </div>
  );
}
