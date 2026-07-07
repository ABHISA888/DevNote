import { Plus, DownloadCloud } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ApiHeader.jsx
 * 
 * WHY THIS EXISTS:
 * This acts as the module-specific toolbar. Since the global ProjectHeader sits above
 * the tabs, this local header provides the primary calls-to-action (CTAs) for managing APIs.
 */
export default function ApiHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600">
          <DownloadCloud size={14} /> Import Collection
        </button>
        <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700">
          <Plus size={14} strokeWidth={2.5} /> Add API
        </button>
      </div>
    </div>
  );
}
