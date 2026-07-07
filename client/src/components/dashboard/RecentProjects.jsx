import ProjectCard from './ProjectCard';
import { RECENT_PROJECTS } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: RecentProjects.jsx
 * 
 * WHY THIS EXISTS:
 * This component sets up the grid layout for the bottom project cards.
 * It's responsive (1 col on mobile, 2 on tablet, 4 on large desktops).
 */
export default function RecentProjects() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm border-dashed">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {RECENT_PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
