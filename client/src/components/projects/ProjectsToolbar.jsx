import { Search } from 'lucide-react';

export default function ProjectsToolbar({
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  techStackFilter,
  onTechStackFilterChange,
  sortOrder,
  onSortOrderChange,
  availableTechStacks = []
}) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
      <div className="relative w-full max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Search size={14} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Filter by name..." 
          className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 shadow-sm" 
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 xl:gap-6">
        <div className="flex items-center gap-2">
          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 outline-none cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          {/* Tech Stack Select */}
          <select
            value={techStackFilter}
            onChange={(e) => onTechStackFilterChange(e.target.value)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 outline-none cursor-pointer animate-fade-in"
          >
            <option value="All">All Tech Stacks</option>
            {availableTechStacks.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4 border-l border-gray-200 pl-4 xl:pl-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span>Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 outline-none cursor-pointer transition hover:bg-slate-50"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
