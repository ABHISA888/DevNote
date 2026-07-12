import { useState } from 'react';
import { Search, Bell, Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * 🎓 TEACHING MOMENT: TopNavbar.jsx
 * 
 * WHY THIS EXISTS:
 * The TopNavbar provides global context and actions that are unrelated to the specific page 
 * the user is on. Things like global search and global notifications
 * belong here because they apply to the entire workspace.
 * 
 * DATA FLOW:
 * The user profile data is retrieved dynamically from `useAuth()`.
 */
export default function TopNavbar({ onOpenMobileMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = user?.name || 'Developer';
  const userEmail = user?.email || '';
  const userAvatar = user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userName}&backgroundColor=6366f1`;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
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

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 transition hover:opacity-80 focus:outline-none"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-100 ring-2 ring-white">
              <img 
                src={userAvatar} 
                alt="User Avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-slate-700 hidden sm:block">{userName}</span>
          </button>

          {isDropdownOpen && (
            <>
              {/* Click-away backdrop */}
              <div 
                className="fixed inset-0 z-30 cursor-default" 
                onClick={() => setIsDropdownOpen(false)}
              />
              
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-40">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">{userName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  <User size={14} className="text-slate-400" />
                  My Profile
                </button>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={14} className="text-red-400" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
