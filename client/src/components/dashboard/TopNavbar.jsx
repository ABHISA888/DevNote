import { Search, Bell, Moon, Menu } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TopNavbar.jsx
 * 
 * WHY THIS EXISTS:
 * The TopNavbar provides global context and actions that are unrelated to the specific page 
 * the user is on. Things like global search, global notifications, and global theme toggling 
 * belong here because they apply to the entire workspace.
 * 
 * HOW SAAS DASHBOARDS USE IT:
 * It acts as the anchor of the page structure (alongside the sidebar). It's typically given a sticky 
 * or fixed positioning so that no matter how far down a long table the user scrolls, they can 
 * always access their search bar or user profile.
 * 
 * DATA FLOW:
 * Later, the "Harshu" profile data will come from an AuthContext or Redux store holding the 
 * currently logged-in user's session data.
 */
export default function TopNavbar({ onOpenMobileMenu }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 sm:px-6 backdrop-blur-md">
      {/* ── Left: Global Search & Mobile Menu ── */}
      <div className="flex w-full max-w-md items-center gap-3">
        <button 
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={20} />
        </button>
        <div className="relative w-full hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search projects, tasks, or settings..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ── Right: User Actions ── */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative text-gray-400 transition hover:text-slate-600">
          <Bell size={18} />
          {/* Notification dot indicator */}
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </button>

        {/* Theme Toggle (Mocked as Moon for design) */}
        <button className="text-gray-400 transition hover:text-slate-600">
          <Moon size={18} />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* User Profile Dropdown trigger */}
        <button className="flex items-center gap-3 transition hover:opacity-80">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-indigo-100 ring-2 ring-white">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harshu&backgroundColor=6366f1" 
              alt="User Avatar" 
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-slate-700 hidden sm:block">Harshu</span>
        </button>
      </div>
    </header>
  );
}
