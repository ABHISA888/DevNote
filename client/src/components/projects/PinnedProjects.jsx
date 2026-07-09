import PinnedProjectCard from './PinnedProjectCard';
import { PINNED_PROJECTS } from '../../constants/projectsData';

export default function PinnedProjects({ onEdit, onDelete }) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Pinned Projects</h2>
        <button className="text-xs font-bold text-primary-600 hover:text-primary-700">View all</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PINNED_PROJECTS.map((project) => (
          <PinnedProjectCard
            key={project.id}
            project={project}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project)}
          />
        ))}
      </div>
    </div>
  );
}
