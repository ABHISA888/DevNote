import { ChevronRight, Search, Plus, ChevronDown } from 'lucide-react';

const PROJECTS = [
  'All Projects',
  'DevNote',
  'Portfolio',
  'AI Workspace',
  'College ERP',
  'E-Commerce'
];

export default function TaskHeader({ 
  projectName = 'DevNote', 
  searchQuery, 
  onSearchChange,
  selectedProject,
  onProjectChange,
  isGlobal,
  onNewTask 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Left: Breadcrumbs & Title */}
      <div className="flex flex-col">
        {!isGlobal && (
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
            <span className="hover:text-primary-600 cursor-pointer transition">Projects</span>
            <ChevronRight size={12} />
            <span className="text-slate-600">{projectName}</span>
          </nav>
        )}
        <h2 className="text-xl font-extrabold text-slate-800">
          {isGlobal ? 'Global Tasks' : 'Tasks'}
        </h2>
      </div>
      
      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Project Filter Dropdown */}
        {isGlobal && (
          <div className="relative hidden sm:block">
            <select
              value={selectedProject}
              onChange={(e) => onProjectChange(e.target.value)}
              className="h-9 w-40 appearance-none rounded-md border border-gray-200 bg-white pl-3 pr-8 text-xs font-medium text-slate-700 outline-none transition hover:border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            >
              {PROJECTS.map((proj) => (
                <option key={proj} value={proj}>
                  {proj}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
        )}

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
