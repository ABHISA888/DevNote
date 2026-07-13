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
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/api/projectService';

export default function DashboardPage() {
  const { user } = useAuth();
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

  // Compute completed projects in current month
  const now = new Date();
  const completedThisMonth = projects.filter(p => {
    if (p.status !== 'Completed') return false;
    const date = new Date(p.updatedAt || p.createdAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  // Compute current streak of active days (days with creation or update)
  const calculateStreak = (projectsList) => {
    if (projectsList.length === 0) return 0;
    const dates = projectsList.map(p => {
      const d = new Date(p.updatedAt || p.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    const latestDateStr = uniqueDates[0];
    if (!latestDateStr) return 0;

    const latestDate = new Date(latestDateStr);
    const diffTime = checkDate - latestDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) return 0;

    let currentCheck = latestDate;
    for (let i = 0; i < uniqueDates.length; i++) {
      const dateStr = `${currentCheck.getFullYear()}-${String(currentCheck.getMonth() + 1).padStart(2, '0')}-${String(currentCheck.getDate()).padStart(2, '0')}`;
      if (uniqueDates.includes(dateStr)) {
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  const currentStreak = calculateStreak(projects);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Developer';
  const quote = `"The only way to do great work is to love what you do. Stay focused, ${firstName}."`;

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
              <UpcomingDeadlines projects={projects} />
              <RecentActivity projects={projects} />
            </div>
            
            {/* Right Column (Narrower, approx 33%) */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <PinnedProjects projects={projects} />
              <ProductivityCard 
                completedThisMonth={completedThisMonth} 
                currentStreak={currentStreak} 
                quote={quote} 
              />
            </div>
            
          </div>

          {/* ── Bottom Section ── */}
          <RecentProjects projects={projects} />
        </>
      )}
      
    </div>
  );
}
