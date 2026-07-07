import WelcomeSection from '../../components/dashboard/WelcomeSection';
import StatsGrid from '../../components/dashboard/StatsGrid';
import QuickActions from '../../components/dashboard/QuickActions';
import UpcomingDeadlines from '../../components/dashboard/UpcomingDeadlines';
import PinnedProjects from '../../components/dashboard/PinnedProjects';
import RecentActivity from '../../components/dashboard/RecentActivity';
import ProductivityCard from '../../components/dashboard/ProductivityCard';
import RecentProjects from '../../components/dashboard/RecentProjects';
import { PRODUCTIVITY_INSIGHTS } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: DashboardPage.jsx
 * 
 * WHY THIS EXISTS:
 * This is the COMPOSITION ROOT for the Dashboard route. 
 * Notice how clean this file is? It contains almost no HTML or CSS. 
 * Its sole responsibility is to import all the independent sections and arrange them 
 * using a high-level Grid layout. 
 * 
 * HOW SAAS DASHBOARDS USE IT:
 * By keeping the page orchestrator clean, when a PM says "Move Pinned Projects above 
 * Productivity Insights", it takes 5 seconds to swap two component lines here, rather 
 * than untangling 400 lines of nested `<div>`s.
 */
export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* ── Top Level Context ── */}
      <WelcomeSection />
      
      {/* ── High Level Metrics ── */}
      <StatsGrid />
      
      {/* ── Action Bar ── */}
      <QuickActions />
      
      {/* ── Main Dashboard Split Area ── */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Column (Wider, approx 66%) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <UpcomingDeadlines />
          <RecentActivity />
        </div>
        
        {/* Right Column (Narrower, approx 33%) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <PinnedProjects />
          <ProductivityCard {...PRODUCTIVITY_INSIGHTS} />
        </div>
        
      </div>

      {/* ── Bottom Section ── */}
      <RecentProjects />
      
    </div>
  );
}
