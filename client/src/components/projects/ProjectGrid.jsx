import ProjectCard from './ProjectCard';
import { ALL_PROJECTS } from '../../constants/projectsData';

export default function ProjectGrid() {
  return (
    <div>
      <h2 className="mb-4 text-base font-bold text-slate-800">All Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ALL_PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
