import React from 'react';
import PinnedProjectCard from './PinnedProjectCard';
import { Rocket } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: Conditional UI Rendering
 * 
 * If a developer has no pinned or favorited projects, rendering a large blank box is bad UX.
 * - We check if the pinned array is empty.
 * - If empty, we can return null or render a helpful, clean prompt encouraging them to favorite a project.
 */
export default function PinnedProjects({
  projects = [],
  onEdit,
  onDelete,
  onPinToggle,
  onFavoriteToggle
}) {
  // Filter for pinned projects
  const pinnedList = projects.filter((p) => p.isPinned);

  if (pinnedList.length === 0) {
    return (
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Pinned Projects</h2>
        </div>
        <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 p-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            No projects pinned yet. Click the pin icon on a project card to pin it here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Pinned Projects</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pinnedList.map((project) => (
          <PinnedProjectCard 
            key={project._id}
            project={project}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project)}
            onPinToggle={onPinToggle}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
}
