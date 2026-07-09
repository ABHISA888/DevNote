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
      value: '3', // Keep placeholder until tasks collections are integrated
      metaText: 'Critical', 
      metaColor: 'text-red-500' 
    },
    { 
      id: 'tasks', 
      label: 'TASKS', 
      value: '15', // Keep placeholder until kanban board is integrated
      metaText: 'Pending', 
      metaColor: 'text-slate-500' 
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
