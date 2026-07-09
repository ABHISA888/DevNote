import { useState } from 'react';
import toast from 'react-hot-toast';

import { ProjectProvider, useProjects } from '../../context/ProjectContext';
import ProjectsHeader from '../../components/projects/ProjectsHeader';
import StatsCards from '../../components/projects/StatsCards';
import ProjectsToolbar from '../../components/projects/ProjectsToolbar';
import PinnedProjects from '../../components/projects/PinnedProjects';
import ProjectGrid from '../../components/projects/ProjectGrid';
import RecentlyEdited from '../../components/projects/RecentlyEdited';
import StackOverview from '../../components/projects/StackOverview';
import HelpCard from '../../components/projects/HelpCard';
import FloatingActionButton from '../../components/projects/FloatingActionButton';
import CreateProjectWizard from '../../components/projects/wizard/CreateProjectWizard';
import DeleteConfirmModal from '../../components/projects/DeleteConfirmModal';
import { STACK_OVERVIEW } from '../../constants/projectsData';

/**
 * ProjectsPage.jsx — Composition Root for /projects
 *
 * This page is the single source of truth for modal state:
 *   wizardState  – controls which mode (create/edit) the wizard opens in
 *   deleteState  – controls which project the delete modal targets
 *
 * All state mutations flow through context (useProjects), so every component
 * in the tree sees the same live projects array without prop drilling.
 *
 * FUTURE BACKEND INTEGRATION:
 * The three handlers below (handleProjectCreated, handleProjectUpdated,
 * handleDeleteConfirm) are the only places that will gain API calls.
 * Component structure stays identical.
 */

const WIZARD_DEFAULT = { open: false, mode: 'create', initialData: null };
const DELETE_DEFAULT = { open: false, projectId: null, projectTitle: '' };

function ProjectsInner() {
  const { addProject, updateProject, deleteProject } = useProjects();

  const [wizardState, setWizardState] = useState(WIZARD_DEFAULT);
  const [deleteState, setDeleteState] = useState(DELETE_DEFAULT);

  // ─── Wizard actions ────────────────────────────────────────────────────────

  const openCreateWizard = () =>
    setWizardState({ open: true, mode: 'create', initialData: null });

  /**
   * Build the wizard's flat projectData shape from a ProjectCard's data shape.
   * ALL_PROJECTS entries don't have _raw, so we reconstruct best-effort fields.
   * Wizard-created/edited projects carry ._raw with the full original payload.
   */
  const openEditWizard = (project) => {
    const raw = project._raw ?? {
      name: project.title ?? '',
      description: project.description ?? '',
      category: project.category ?? '',
      visibility: project.visibility ?? 'private',
      isFavorite: project.isFavorite ?? false,
      templateId: project.templateId ?? 'blank',
      techStack: project.badges ?? [],
      priority: project.priority ?? 'Medium',
      estimatedDuration: project.estimatedDuration ?? '',
      githubUrl: project.githubUrl ?? '',
      figmaUrl: project.figmaUrl ?? '',
      apiDocUrl: project.apiDocUrl ?? '',
      postmanUrl: project.postmanUrl ?? '',
      deploymentUrl: project.deploymentUrl ?? '',
      startDate: project.startDate ?? '',
      deadline: project.deadline ?? '',
      reminderToggle: project.reminderToggle ?? false,
      reminderDaysBefore: project.reminderDaysBefore ?? 1,
      teamMembers: project.members ?? [],
      // Carry id so updateProject can target the right entry
      id: project.id,
    };
    setWizardState({ open: true, mode: 'edit', initialData: raw });
  };

  const closeWizard = () => setWizardState(WIZARD_DEFAULT);

  // ─── Create ────────────────────────────────────────────────────────────────

  const handleProjectCreated = (projectData) => {
    // Future: await api.post('/projects', projectData)
    addProject(projectData);
  };

  // ─── Update ────────────────────────────────────────────────────────────────

  const handleProjectUpdated = (projectData) => {
    // Future: await api.patch(`/projects/${projectData.id}`, projectData)
    updateProject(projectData);
  };

  // ─── Delete ────────────────────────────────────────────────────────────────

  const openDeleteModal = (project) =>
    setDeleteState({ open: true, projectId: project.id, projectTitle: project.title });

  const closeDeleteModal = () => setDeleteState(DELETE_DEFAULT);

  const handleDeleteConfirm = () => {
    // Future: await api.delete(`/projects/${deleteState.projectId}`)
    deleteProject(deleteState.projectId);
    toast.success(`Project "${deleteState.projectTitle}" deleted.`);
    closeDeleteModal();
  };

  // ─── Shared action dispatcher ──────────────────────────────────────────────

  const actionHandlers = {
    onEdit: openEditWizard,
    onDelete: openDeleteModal,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative min-h-screen">

      {/* ── Header Area ── */}
      <ProjectsHeader onNewProjectClick={openCreateWizard} />

      {/* ── High Level Metrics ── */}
      <StatsCards />

      {/* ── Filter & Search Toolbar ── */}
      <ProjectsToolbar />

      {/* ── Main 2-Column Split Layout ── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">

        {/* Left Column: Projects Feed */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <PinnedProjects {...actionHandlers} />
          <ProjectGrid {...actionHandlers} />
        </div>

        {/* Right Column: Context Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RecentlyEdited />
          <StackOverview data={STACK_OVERVIEW} />
          <HelpCard />
        </div>

      </div>

      {/* ── Global Action ── */}
      <FloatingActionButton onClick={openCreateWizard} />

      {/* ── Create / Edit Project Wizard ── */}
      <CreateProjectWizard
        isOpen={wizardState.open}
        onClose={closeWizard}
        mode={wizardState.mode}
        initialData={wizardState.initialData}
        onProjectCreated={handleProjectCreated}
        onProjectUpdated={handleProjectUpdated}
      />

      {/* ── Delete Confirmation Modal ── */}
      <DeleteConfirmModal
        isOpen={deleteState.open}
        projectTitle={deleteState.projectTitle}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}

/**
 * Outer shell wraps the inner component in ProjectProvider so every
 * descendant can call useProjects() without drilling the array through props.
 */
export default function ProjectsPage() {
  return (
    <ProjectProvider>
      <ProjectsInner />
    </ProjectProvider>
  );
}
