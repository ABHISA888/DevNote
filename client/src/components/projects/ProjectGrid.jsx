import ProjectCard from './ProjectCard';
import { useProjects } from '../../context/ProjectContext';

/**
 * ProjectGrid — renders the "All Projects" section.
 *
 * Reads the live projects array from context so additions, edits,
 * duplicates, and deletes are reflected immediately without a page reload.
 *
 * Props
 * ─────
 * onEdit(project)      – open wizard pre-filled
 * onDelete(project)    – open delete confirmation
 * onDuplicate(project) – instant clone (no modal needed)
 */
export default function ProjectGrid({ onEdit, onDelete }) {
  const { projects } = useProjects();

  return (
    <div>
      <h2 className="mb-4 text-base font-bold text-slate-800">All Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project)}
          />
        ))}
      </div>
    </div>
  );
}
