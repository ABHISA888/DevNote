import React from 'react';
import { Star } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: Derived State & Computed Values
 * 
 * Instead of storing counts in separate React state fields (which is error-prone and causes extra 
 * re-renders), we derive/calculate the stats directly from the `projects` prop during rendering.
 * This is faster, keeps state synchronized, and is the standard approach in React.
 */
export default function StatsCards({ projects = [] }) {
  // Compute counts dynamically
  const totalCount = projects.length;
  const activeCount = projects.filter(
    (p) => p.status === 'In Progress' || p.status === 'active' || p.status === 'ACTIVE'
  ).length;
  const completedCount = projects.filter(
    (p) => p.status === 'Completed' || p.status === 'completed' || p.status === 'COMPLETED'
  ).length;
  const archivedCount = projects.filter(
    (p) => p.status === 'Archived' || p.status === 'archived' || p.status === 'ARCHIVED'
  ).length;
  const favoritesCount = projects.filter((p) => p.isFavorite).length;

  const stats = [
    { id: 'total', label: 'TOTAL', value: totalCount },
    { id: 'active', label: 'ACTIVE', value: activeCount, valueColor: 'text-indigo-600' },
    { id: 'completed', label: 'COMPLETED', value: completedCount },
    { id: 'archived', label: 'ARCHIVED', value: archivedCount },
    { id: 'favorites', label: 'FAVORITES', value: favoritesCount, icon: Star, iconColor: 'text-indigo-600', fill: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.id} 
            className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md"
          >
            <h3 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">
              {stat.label}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-extrabold leading-none ${stat.valueColor || 'text-slate-800'}`}>
                {stat.value}
              </span>
              {Icon && (
                <Icon 
                  size={16} 
                  className={`${stat.iconColor} ${stat.fill ? 'fill-current' : ''}`} 
                  strokeWidth={2.5} 
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
