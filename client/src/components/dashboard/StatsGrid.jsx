import StatCard from './StatCard';
import { STATS } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: StatsGrid.jsx
 * 
 * WHY THIS EXISTS:
 * Acts as the orchestration layer for our `StatCard` components.
 * This is where we handle the responsive CSS Grid layout (columns change based on screen size).
 */
export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 mb-8 border-b border-dashed border-gray-300 pb-8">
      {STATS.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
