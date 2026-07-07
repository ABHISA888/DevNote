import { LayoutGrid, List, Plus } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TasksHeader.jsx
 *
 * WHY THIS EXISTS:
 * Separates the navigation context (breadcrumb) and primary actions from the table logic.
 * The `onNewTask` callback is passed down from the page — this is the "Lifting State Up"
 * pattern. The modal state lives in TasksPage, not here, keeping this component pure.
 */
export default function TasksHeader({ onNewTask }) {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <span className="hover:text-indigo-600 cursor-pointer transition">Projects</span>
        <ChevronRight size={12} />
        <span className="hover:text-indigo-600 cursor-pointer transition">DevLaunch Core</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">Tasks</h1>

        <div className="flex items-center gap-3">
          {/* View Toggle: Board / List */}
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <button className="flex items-center gap-1.5 border-r border-gray-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">
              <LayoutGrid size={14} />
              Board
            </button>
            <button className="flex items-center gap-1.5 bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">
              <List size={14} />
              List
            </button>
          </div>

          {/* New Task CTA */}
          <button
            id="new-task-btn"
            onClick={onNewTask}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
          >
            <Plus size={14} strokeWidth={2.5} />
            New Task
          </button>
        </div>
      </div>
    </div>
  );
}
