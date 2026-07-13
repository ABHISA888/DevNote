import React from 'react';
import StatCard from './StatCard';
import { Star, CheckCircle2, FolderGit2 } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: Reusable Stat Grid with Dynamic Calculation
 * 
 * We map the computed project counts to the visual structure of the dashboard KPI blocks.
 * For sections not yet bound to a database collection (e.g. Tasks and Deadlines), we keep stable
 * placeholders to keep the layout complete while updating the rest with real data.
 */
export default function StatsGrid({ projects = [] }) {
  // Compute metrics dynamically from projects array
  const totalCount = projects.length;
  
  const activeCount = projects.filter(
    (p) => p.status === 'In Progress' || p.status === 'active' || p.status === 'ACTIVE'
  ).length;

  const completedCount = projects.filter(
    (p) => p.status === 'Completed' || p.status === 'completed' || p.status === 'COMPLETED'
  ).length;

  const favoritesCount = projects.filter((p) => p.isFavorite).length;

  // Calculate active percentage for the progress-style card
  const activePercent = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

  // Calculate upcoming deadlines count (active projects with future deadlines within 7 days)
  const upcomingDeadlinesCount = projects.filter(p => {
    if (!p.deadline || p.status === 'Completed') return false;
    const diffTime = new Date(p.deadline) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  // Calculate overall Health Score
  const atRiskCount = projects.filter(p => {
    if (p.priority === 'Critical') return true;
    if (p.deadline) {
      const diffTime = new Date(p.deadline) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 0 && p.status !== 'Completed') return true;
    }
    return false;
  }).length;
  const healthyCount = totalCount - atRiskCount;
  const healthScorePercent = totalCount > 0 ? Math.round((healthyCount / totalCount) * 100) : 100;

  const stats = [
    { 
      id: 'total', 
      label: 'TOTAL PROJECTS', 
      value: String(totalCount), 
      metaText: '+new', 
      metaColor: 'text-indigo-600',
      icon: FolderGit2,
      iconColor: 'text-indigo-500'
    },
    { 
      id: 'active', 
      label: 'ACTIVE', 
      value: String(activeCount), 
      type: 'progress', 
      progressValue: activePercent 
    },
    { 
      id: 'completed', 
      label: 'COMPLETED', 
      value: String(completedCount), 
      icon: CheckCircle2, 
      iconColor: 'text-emerald-500' 
    },
    { 
      id: 'deadlines', 
      label: 'DEADLINES', 
      value: String(upcomingDeadlinesCount),
      metaText: upcomingDeadlinesCount > 0 ? 'Critical' : 'None', 
      metaColor: upcomingDeadlinesCount > 0 ? 'text-red-500' : 'text-slate-500' 
    },
    { 
      id: 'health', 
      label: 'HEALTH SCORE', 
      value: `${healthScorePercent}%`,
      metaText: healthScorePercent >= 80 ? 'Healthy' : (healthScorePercent >= 50 ? 'Warning' : 'At Risk'), 
      metaColor: healthScorePercent >= 80 ? 'text-emerald-500' : (healthScorePercent >= 50 ? 'text-amber-500' : 'text-red-500') 
    },
    { 
      id: 'favorites', 
      label: 'FAVORITES', 
      value: String(favoritesCount), 
      icon: Star, 
      iconColor: 'text-amber-500', 
      fill: true 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 mb-8 border-b border-dashed border-gray-300 pb-8">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
