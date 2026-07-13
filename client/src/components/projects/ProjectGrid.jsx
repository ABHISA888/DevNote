import React from 'react';
import ProjectCard from './ProjectCard';

/**
 * 🎓 TEACHING MOMENT: Adapter/Mapper Pattern in React
 * 
 * Database schemas and UI components frequently represent the same data differently.
 * Instead of changing our database schema or breaking the existing frontend components, we write
 * a pure mapper function inside `ProjectGrid.jsx`. This transforms the MongoDB project payload 
 * into the visual contracts required by the pre-built `ProjectCard` component.
 */
export default function ProjectGrid({
  projects = [],
  onEdit,
  onDelete,
  onPinToggle,
  onFavoriteToggle
}) {
  // Pre-defined static team member list to match client/src/components/projects/wizard/TimelineStep.jsx
  const TEAM_MEMBERS_DIRECTORY = [
    { id: 1, name: 'Elena Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    { id: 2, name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { id: 3, name: 'Jordan Kyosho', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
    { id: 4, name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
  ];

  // Theme colors color classes adapter
  const themeColorMap = {
    '#6366f1': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    '#3b82f6': 'bg-blue-50 text-blue-600 border-blue-100',
    '#10b981': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    '#f59e0b': 'bg-amber-50 text-amber-600 border-amber-100',
    '#ef4444': 'bg-red-50 text-red-600 border-red-100',
    '#ec4899': 'bg-pink-50 text-pink-600 border-pink-100',
    '#8b5cf6': 'bg-purple-50 text-purple-600 border-purple-100',
  };

  // Status color classes adapter
  const statusColorMap = {
    'Todo': 'bg-slate-50 text-slate-600',
    'In Progress': 'bg-emerald-50 text-emerald-600',
    'In Review': 'bg-amber-50 text-amber-600',
    'Completed': 'bg-blue-50 text-blue-600',
  };

  // Map backend documents into visual props
  const mappedProjects = projects.map((p) => {
    // Generate initials from project name
    const initials = p.name
      ? p.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
      : 'DP';

    // Calculate progress percentage based on project status
    let progress = 0;
    if (p.status === 'Completed') progress = 100;
    else if (p.status === 'In Review') progress = 75;
    else if (p.status === 'In Progress') progress = 50;

    // Resolve team members avatars
    const members = (p.teamMembers || []).map((id) => {
      // Find the member in our directory by their ID (handling both string and number comparison)
      return TEAM_MEMBERS_DIRECTORY.find((m) => String(m.id) === String(id));
    }).filter(Boolean);

    // Fallback if no members assigned
    if (members.length === 0) {
      members.push({
        id: 'owner',
        name: 'Owner',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Owner'
      });
    }

    // Format relative/simple last updated label
    const lastUpdated = p.updatedAt
      ? `Updated ${new Date(p.updatedAt).toLocaleDateString()}`
      : 'Updated recently';

    return {
      id: p._id,
      title: p.name,
      initials,
      initialsColor: themeColorMap[p.themeColor] || 'bg-indigo-50 text-indigo-600 border-indigo-100',
      lastUpdated,
      isFavorite: p.isFavorite || false,
      isPinned: p.isPinned || false,
      description: p.description,
      badges: p.techStack || [],
      progress,
      members,
      additionalMembers: 0,
      status: p.status || 'Todo',
      statusColor: statusColorMap[p.status] || 'bg-slate-50 text-slate-600'
    };
  });

  if (mappedProjects.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-base font-bold text-slate-800">All Projects</h2>
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-sm font-bold text-slate-700">No Projects Found</h3>
          <p className="mt-2 text-xs text-slate-400">Initialize a new project workspace to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-base font-bold text-slate-800">All Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {mappedProjects.map((project) => {
          const original = projects.find(p => String(p._id) === String(project.id));
          return (
            <ProjectCard
              key={project.id}
              {...project}
              onEdit={() => onEdit(original)}
              onDelete={() => onDelete(original)}
              onPinToggle={onPinToggle}
              onFavoriteToggle={onFavoriteToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
