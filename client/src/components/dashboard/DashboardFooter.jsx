/**
 * 🎓 TEACHING MOMENT: DashboardFooter.jsx
 * 
 * WHY THIS EXISTS:
 * Even SaaS dashboards need a footer to house legal, support, and system status links. 
 * Instead of cluttering the TopNavbar or Sidebar with these tertiary links, they live at 
 * the bottom of the page content.
 * 
 * HOW SAAS DASHBOARDS USE IT:
 * The most important element here is the "System Status". Real enterprise apps dynamically 
 * check an endpoint (like a statuspage.io API) to display a green/yellow/red dot based on 
 * system health. 
 */
export default function DashboardFooter() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-between gap-4 border-t border-gray-100 bg-white px-8 py-6 text-xs text-slate-500 sm:flex-row">
      <div className="flex items-center gap-1 font-medium">
        <span>v2.4.0-stable</span>
        <span className="text-gray-300">|</span>
        <span>Build: 8df2c1a</span>
      </div>

      <div className="flex items-center gap-6 font-semibold">
        <a href="#" className="hover:text-slate-800 transition">System Status</a>
        <a href="#" className="hover:text-slate-800 transition">Docs</a>
        <a href="#" className="hover:text-slate-800 transition">Support</a>
        
        <div className="flex items-center gap-2 text-primary-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600"></span>
          </span>
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </footer>
  );
}
