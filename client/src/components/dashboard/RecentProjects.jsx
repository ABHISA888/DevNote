import React from 'react';
import ProjectCard from './ProjectCard';

/**
 * 🎓 TEACHING MOMENT: Rotating UI Accents
 * 
 * To match the rich aesthetic defined in the mock database design:
 * - We create a list of pastel color classes (`bg-indigo-50`, `bg-emerald-50`, etc.).
 * - We select a thumbnail background using the modulo operator (`index % colors.length`) on the project list map.
 * - This provides vibrant, alternating color cards without hardcoding design attributes inside Mongoose.
 */
export default function RecentProjects({ projects = [] }) {
  // Get top 4 most recent projects
  const recentList = projects.slice(0, 4);

  const colors = ['bg-indigo-50', 'bg-emerald-50', 'bg-blue-50', 'bg-orange-50'];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm border-dashed">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Projects</h2>
      </div>
      
      {recentList.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-xs font-semibold text-slate-400">
            No projects initialized yet. Initialize your first project workspace above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentList.map((project, index) => (
            <ProjectCard 
              key={project._id}
              title={project.name}
              description={project.description}
              badges={project.techStack || []}
              thumbnailColor={colors[index % colors.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
