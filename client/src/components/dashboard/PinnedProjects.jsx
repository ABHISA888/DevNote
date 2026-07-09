import React from 'react';
import { Pin } from 'lucide-react';
import PinnedProjectCard from './PinnedProjectCard';

/**
 * 🎓 TEACHING MOMENT: Dense Layout Limits
 * 
 * In UI dashboards, sidebars have limited vertical space.
 * We filter for favorited projects and use `.slice(0, 3)` to cap the rendering to the top 3 items,
 * preventing layout breakages if a user favorites dozens of workspaces.
 */
export default function PinnedProjects({ projects = [] }) {
  // Filter for favorited projects
  const pinnedList = projects.filter((p) => p.isFavorite).slice(0, 3);

  // Helper to derive progress
  const getProgress = (status) => {
    if (status === 'Completed') return 100;
    if (status === 'In Review') return 75;
    if (status === 'In Progress') return 50;
    return 0;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Pinned Projects</h2>
        <Pin size={16} className="text-indigo-600 animate-pulse" />
      </div>
      
      <div className="flex flex-col gap-4">
        {pinnedList.length === 0 ? (
          <p className="text-xs font-semibold text-slate-400 py-2">
            No pinned projects. Favorite a project to see it here!
          </p>
        ) : (
          pinnedList.map((project) => (
            <PinnedProjectCard 
              key={project._id} 
              title={project.name}
              badges={(project.techStack || []).slice(0, 2)} // Show max 2 badges in dense layout
              progressPercent={getProgress(project.status)}
            />
          ))
        )}
      </div>
    </div>
  );
}
