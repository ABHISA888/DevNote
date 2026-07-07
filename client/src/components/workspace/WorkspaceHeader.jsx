import { ChevronRight, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * 🎓 TEACHING MOMENT: WorkspaceHeader.jsx
 *
 * WHY THIS EXISTS:
 * This is the TOP BAR specific to the workspace — different from the global
 * DashboardLayout TopNavbar. In products like GitHub, once you open a repository
 * you get a secondary contextual nav bar with the repo name and search scoped
 * to that repo. This is that pattern.
 *
 * It's separate from ProjectHeader (the project metadata card below) because
 * the top bar is layout-level chrome — always fixed at the top — while
 * ProjectHeader is page-level content that scrolls.
 */
export default function WorkspaceHeader({ projectName }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-gray-100 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
        <button
          onClick={() => navigate('/projects')}
          className="transition hover:text-indigo-600"
        >
          /
        </button>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-800">{projectName}</span>
      </nav>

      {/* Right: Search */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search workspace..."
            className="h-8 w-48 rounded-lg border border-gray-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-600 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 lg:w-64"
          />
        </div>
      </div>
    </header>
  );
}
