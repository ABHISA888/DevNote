import { Search, LayoutGrid, List, ChevronDown } from 'lucide-react';

function FilterDropdown({ label }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
      {label} <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}

export default function ProjectsToolbar() {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
      <div className="relative w-full max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Search size={14} strokeWidth={2.5} />
        </div>
        <input type="text" placeholder="Filter by name..." className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 shadow-sm" />
      </div>
      <div className="flex flex-wrap items-center gap-3 xl:gap-6">
        <div className="flex items-center gap-2">
          <FilterDropdown label="Status" />
          <FilterDropdown label="Priority" />
          <FilterDropdown label="Tech Stack" />
        </div>
        <div className="flex items-center gap-4 border-l border-gray-200 pl-4 xl:pl-6">
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm">
            <button className="rounded-md bg-primary-50 p-1.5 text-primary-600 transition"><LayoutGrid size={14} /></button>
            <button className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 transition"><List size={14} /></button>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
            Sort: <span className="text-slate-800">Newest</span> <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
