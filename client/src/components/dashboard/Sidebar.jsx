import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import { SIDEBAR_NAV } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: Sidebar.jsx
 * 
 * WHY THIS EXISTS:
 * The Sidebar is the primary navigation hub of our SaaS application. 
 * By isolating it into its own component, we separate the routing logic from the actual page content.
 * 
 * HOW SAAS DASHBOARDS USE IT:
 * In enterprise apps (Linear, Notion), the sidebar is a persistent stateful component. 
 * It stays mounted even as the user navigates between pages, which prevents unnecessary re-renders
 * and keeps the application feeling extremely fast (SPA behavior).
 * 
 * WHY IT'S REUSABLE:
 * We map over `SIDEBAR_NAV` from our constants file. If product managers later want to add an "Analytics" 
 * tab, we don't have to touch this JSX. We just add one line to the constants array.
 */
export default function Sidebar({ isCollapsed, onToggle, isMobileMenuOpen, onMobileClose }) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#f8f9fe] border-r border-gray-100 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${
        isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* ── Logo Section ── */}
      <div className="flex h-16 items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-indigo-700 leading-tight">DevNote</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Developer Workspace</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation Links ── */}
      <nav className="mt-8 flex flex-1 flex-col gap-1.5 px-3">
        {SIDEBAR_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
                    }`} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  {!isCollapsed && (
                    <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Collapse Toggle (Desktop Only) ── */}
      <div className="hidden md:block border-t border-gray-100 p-4">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg bg-white p-2 text-slate-400 shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-slate-600 transition"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
