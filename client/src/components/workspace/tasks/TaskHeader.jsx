import { ChevronRight, Search, Plus } from 'lucide-react';

export default function TaskHeader({ 
  projectName = 'DevNote', 
  searchQuery, 
  onSearchChange, 
  onNewTask 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Left: Breadcrumbs & Title */}
      <div className="flex flex-col">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
          <span className="hover:text-primary-600 cursor-pointer transition">Projects</span>
          <ChevronRight size={12} />
          <span className="text-slate-600">{projectName}</span>
        </nav>
        <h2 className="text-xl font-extrabold text-slate-800">Tasks</h2>
      </div>
      
      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-64 hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
          />
        </div>

        {/* Primary CTA */}
        <button 
          onClick={onNewTask}
          className="flex h-9 items-center gap-1.5 rounded-md bg-primary-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700 active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} /> 
          New Task
        </button>
      </div>
    </div>
  );
}
