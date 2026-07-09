import { Search, Filter, LayoutDashboard, List } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskFilters.jsx
 * 
 * WHY THIS EXISTS:
 * Providing robust search and view toggles empowers developers to find what they need
 * without scrolling through massive boards.
 * The segmented control (Board vs List) allows users to switch to the view they are
 * most comfortable with.
 */
export default function TaskFilters({ activeView, onViewChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 mb-6">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Filter tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition">
          <Filter size={16} />
        </button>
      </div>

      <div className="flex h-10 items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm w-full sm:w-auto overflow-hidden">
        <button
          onClick={() => onViewChange('board')}
          className={`flex flex-1 sm:w-24 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-bold transition-all h-full ${
            activeView === 'board'
              ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard size={14} />
          Board
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`flex flex-1 sm:w-24 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-bold transition-all h-full ${
            activeView === 'list'
              ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <List size={14} />
          List
        </button>
      </div>
    </div>
  );
}
