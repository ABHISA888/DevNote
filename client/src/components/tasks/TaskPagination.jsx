import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskPagination.jsx
 *
 * WHY THIS EXISTS:
 * Pagination prevents loading all 500+ tasks at once. In real apps, each page
 * fetches a small slice: GET /api/tasks?page=2&limit=10
 * This component is currently UI-only but is ready for backend integration.
 */
export default function TaskPagination({ showing, total, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-xs font-semibold text-slate-500">
        Showing <span className="text-slate-800">{showing}</span> of{' '}
        <span className="text-slate-800">{total}</span> tasks
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft size={14} />
          Previous
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
