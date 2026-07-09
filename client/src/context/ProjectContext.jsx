import { createContext, useContext, useState } from 'react';
import { ALL_PROJECTS } from '../constants/projectsData';

/**
 * 🎓 TEACHING MOMENT: ProjectContext.jsx
 *
 * WHY A CONTEXT?
 * Both ProjectGrid and PinnedProjects render project cards, and ProjectsPage
 * orchestrates modals. Lifting state to ProjectsPage and prop-drilling through
 * PinnedProjects → PinnedProjectCard → ... would be brittle.
 * Context gives every consumer a stable reference without passing props through
 * intermediate layout components.
 *
 * WHY NOT ZUSTAND/REDUX YET?
 * The project is frontend-only mock state. React Context is the right tool at
 * this scale. When a backend + real-time updates arrive, swapping the context
 * internals for a Zustand store or React Query is a one-file change.
 *
 * FUTURE BACKEND INTEGRATION:
 * Each mutation below has a comment showing exactly where the API call goes.
 * The component tree never needs to know about the transport layer.
 */

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(ALL_PROJECTS);

  /**
   * Add a brand-new project.
   * Future: POST /projects
   */
  const addProject = (projectData) => {
    const newProject = buildProjectCard(projectData);
    setProjects((prev) => [newProject, ...prev]);
  };

  /**
   * Update an existing project in place.
   * Future: PATCH /projects/:id
   */
  const updateProject = (updatedProject) => {
    const patched = buildProjectCard(updatedProject, updatedProject.id);
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? patched : p))
    );
  };

  /**
   * Remove a project by id.
   * Future: DELETE /projects/:id
   */
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjects must be used inside <ProjectProvider>');
  }
  return ctx;
}

// ─── Internal helper ────────────────────────────────────────────────────────

/**
 * Maps the flat wizard projectData object → the shape ProjectCard expects.
 * Keeps the data model transformation in one place.
 */
function buildProjectCard(projectData, existingId) {
  const initials = projectData.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return {
    // Preserve the existing id on edit, generate a new slug on create
    id: existingId ?? slugify(projectData.name),
    title: projectData.name,
    initials,
    initialsColor: 'bg-primary-50 text-primary-600 border-primary-100',
    description: projectData.description,
    badges: projectData.techStack.slice(0, 3),
    isFavorite: projectData.isFavorite,
    progress: projectData.progress ?? 0,
    members: projectData.members ?? [],
    additionalMembers: 0,
    status: projectData.status ?? 'ACTIVE',
    statusColor: projectData.statusColor ?? 'bg-primary-50 text-primary-600',
    lastUpdated: 'Just now',
    // Carry forward all raw wizard fields so Edit pre-fills correctly
    _raw: projectData,
  };
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
