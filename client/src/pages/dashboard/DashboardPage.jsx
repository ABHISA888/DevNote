import { useState, useEffect } from 'react';
import WelcomeSection from '../../components/dashboard/WelcomeSection';
import StatsGrid from '../../components/dashboard/StatsGrid';
import QuickActions from '../../components/dashboard/QuickActions';
import UpcomingDeadlines from '../../components/dashboard/UpcomingDeadlines';
import PinnedProjects from '../../components/dashboard/PinnedProjects';
import RecentActivity from '../../components/dashboard/RecentActivity';
import ProductivityCard from '../../components/dashboard/ProductivityCard';
import RecentProjects from '../../components/dashboard/RecentProjects';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { PRODUCTIVITY_INSIGHTS } from '../../constants/dashboardData';
import { projectService } from '../../services/api/projectService';

/**
 * 🎓 TEACHING MOMENT: Dashboard Data Fetching
 * 
 * Dashboards act as aggregate portals for a platform.
 * By fetching the core projects array at the page root, we can distribute slices of the same
 * array to the sub-sections, minimizing duplicate API requests and network latency.
 */
export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const result = await projectService.getProjects();
      if (result.success) {
        setProjects(result.data || []);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch dashboard data.');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Could not load workspace data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* ── Top Level Context ── */}
      <WelcomeSection />
      
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchDashboardData} />
      ) : (
        <>
          {/* ── High Level Metrics ── */}
          <StatsGrid projects={projects} />
          
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
              <PinnedProjects projects={projects} />
              <ProductivityCard {...PRODUCTIVITY_INSIGHTS} />
            </div>
            
          </div>

          {/* ── Bottom Section ── */}
          <RecentProjects projects={projects} />
        </>
      )}
      
    </div>
  );
}
