import { Pin } from 'lucide-react';
import PinnedProjectCard from './PinnedProjectCard';
import { PINNED_PROJECTS } from '../../constants/dashboardData';

/**
 * 🎓 TEACHING MOMENT: PinnedProjects.jsx
 * 
 * WHY THIS EXISTS:
 * Container for the PinnedProjectCard components. Also handles the section header
 * with the pin icon.
 */
export default function PinnedProjects() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Pinned Projects</h2>
        <Pin size={16} className="text-primary-600" />
      </div>
      
      <div className="flex flex-col gap-4">
        {PINNED_PROJECTS.map((project) => (
          <PinnedProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
