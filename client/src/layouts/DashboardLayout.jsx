import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import DashboardFooter from '../components/dashboard/DashboardFooter';

/**
 * 🎓 TEACHING MOMENT: DashboardLayout.jsx
 * 
 * WHY THIS EXISTS:
 * A Layout component is a higher-order structural wrapper. It dictates the macro-level structure 
 * of the screen (e.g., Sidebar on the left, main content on the right). 
 * 
 * HOW SAAS DASHBOARDS USE IT:
 * By using React Router's `<Outlet />`, the Sidebar and Navbar never unmount when the user navigates 
 * from "Dashboard" to "Projects". Only the `<Outlet />` content changes. This is the foundation of 
 * a Single Page Application (SPA).
 */
export default function DashboardLayout() {
  // Global state for sidebar collapse behavior (Desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Global state for mobile sidebar overlay
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#eef0f8] font-sans text-slate-800 overflow-hidden">
      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Fixed Sidebar ── */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* ── Main Content Area (Dynamic Width based on Sidebar) ── */}
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 w-full md:w-auto ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <TopNavbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        
        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="min-h-full flex flex-col">
            <Outlet />
            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
