import { useState, useEffect } from 'react';
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
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { projectService } from '../../services/api/projectService';

/**
 * ProjectsPage.jsx — Composition Root for /projects
 * 
 * 🎓 TEACHING MOMENT: Data Fetching and State Management at Page Root
 * In React, we "lift state up" to the closest common ancestor (ProjectsPage).
 * This component orchestrates the API call, handles loading/error overlays, and feeds the resulting
 * data down to its children (StatsCards, PinnedProjects, ProjectGrid) as read-only props.
 */
import toast from 'react-hot-toast';
import DeleteConfirmModal from '../../components/projects/DeleteConfirmModal';

export default function ProjectsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isEditWizardOpen, setIsEditWizardOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [techStackFilter, setTechStackFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

  // 🎓 TEACHING MOMENT: Asynchronous API Handling
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await projectService.getProjects();
      
      if (result.success) {
        setProjects(result.data || []);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch projects.');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Could not connect to the server. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Append new project to state when created by the wizard
  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setIsEditWizardOpen(true);
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) => prev.map((p) => p._id === updatedProject._id ? updatedProject : p));
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      const res = await projectService.deleteProject(projectToDelete._id);
      if (res.success) {
        toast.success('Project deleted successfully');
        setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      } else {
        toast.error(res.message || 'Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handlePinToggle = async (projectId) => {
    // Optimistic UI update
    const originalProjects = [...projects];
    setProjects((prev) => prev.map((p) => p._id === projectId ? { ...p, isPinned: !p.isPinned } : p));
    
    try {
      const res = await projectService.pinProject(projectId);
      if (res.success) {
        // Update with fresh database data
        setProjects((prev) => prev.map((p) => p._id === projectId ? res.data : p));
        toast.success(res.message || 'Pin status updated');
      } else {
        toast.error(res.message || 'Failed to update pin status');
        setProjects(originalProjects);
      }
    } catch (err) {
      console.error('Error toggling pin status:', err);
      toast.error(err.response?.data?.message || 'Failed to update pin status');
      setProjects(originalProjects);
    }
  };

  const handleFavoriteToggle = async (projectId) => {
    // Optimistic UI update
    const originalProjects = [...projects];
    setProjects((prev) => prev.map((p) => p._id === projectId ? { ...p, isFavorite: !p.isFavorite } : p));
    
    try {
      const res = await projectService.favoriteProject(projectId);
      if (res.success) {
        // Update with fresh database data
        setProjects((prev) => prev.map((p) => p._id === projectId ? res.data : p));
        toast.success(res.message || 'Favorite status updated');
      } else {
        toast.error(res.message || 'Failed to update favorite status');
        setProjects(originalProjects);
      }
    } catch (err) {
      console.error('Error toggling favorite status:', err);
      toast.error(err.response?.data?.message || 'Failed to update favorite status');
      setProjects(originalProjects);
    }
  };

  // Calculate dynamic stack stats for StackOverview sidebar component
  const getDynamicStackOverview = () => {
    const counts = {};
    let totalTechCount = 0;
    
    projects.forEach(p => {
      if (p.techStack && Array.isArray(p.techStack)) {
        p.techStack.forEach(tech => {
          counts[tech] = (counts[tech] || 0) + 1;
          totalTechCount++;
        });
      }
    });

    if (totalTechCount === 0) {
      return [
        { id: 1, language: 'No Stack Data', percentage: 100, color: 'bg-indigo-600' }
      ];
    }

    // Sort and take top 3
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const colors = ['bg-indigo-600', 'bg-slate-300', 'bg-slate-800'];
    
    return sorted.map(([tech, count], index) => ({
      id: index + 1,
      language: tech,
      percentage: Math.round((count / totalTechCount) * 100),
      color: colors[index] || 'bg-slate-400'
    }));
  };

  // Compute available tech stacks dynamically
  const availableTechStacks = [...new Set(projects.flatMap(p => p.techStack || []))].filter(Boolean).sort();

  // Filter projects based on toolbar parameters
  const filteredProjects = projects.filter((p) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = p.name?.toLowerCase().includes(query);
      const descMatch = p.description?.toLowerCase().includes(query);
      if (!nameMatch && !descMatch) return false;
    }
    if (statusFilter !== 'All') {
      if (p.status !== statusFilter) return false;
    }
    if (priorityFilter !== 'All') {
      if (p.priority !== priorityFilter) return false;
    }
    if (techStackFilter !== 'All') {
      if (!p.techStack || !p.techStack.includes(techStackFilter)) return false;
    }
    return true;
  });

  // Sort filtered projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOrder === 'Oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortOrder === 'Alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Put pinned projects first
  const displayProjects = [...sortedProjects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative min-h-screen">

      {/* ── Header Area ── */}
      <ProjectsHeader onNewProjectClick={() => setIsWizardOpen(true)} />
      
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProjects} />
      ) : (
        <>
          {/* ── High Level Metrics ── */}
          <StatsCards projects={projects} />
          
          {/* ── Filter & Search Toolbar ── */}
          <ProjectsToolbar 
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            techStackFilter={techStackFilter}
            onTechStackFilterChange={setTechStackFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            availableTechStacks={availableTechStacks}
          />
          
          {/* ── Main 2-Column Split Layout ── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">
            
            {/* Left Column: Projects Feed */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <PinnedProjects
                projects={filteredProjects}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onPinToggle={handlePinToggle}
                onFavoriteToggle={handleFavoriteToggle}
              />
              <ProjectGrid
                projects={displayProjects}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onPinToggle={handlePinToggle}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </div>
            
            {/* Right Column: Context Widgets */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <RecentlyEdited projects={projects} />
              <StackOverview data={getDynamicStackOverview()} />
              <HelpCard />
            </div>
            
          </div>
        </>
      )}

      {/* ── Global Action ── */}
      <FloatingActionButton onClick={() => setIsWizardOpen(true)} />

      {/* ── Create Project Wizard Modal ── */}
      <CreateProjectWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        onProjectCreated={handleProjectCreated}
      />

      {/* ── Edit Project Wizard Modal ── */}
      <CreateProjectWizard 
        isOpen={isEditWizardOpen}
        onClose={() => {
          setIsEditWizardOpen(false);
          setProjectToEdit(null);
        }}
        mode="edit"
        initialData={projectToEdit}
        onProjectUpdated={handleProjectUpdated}
      />

      {/* ── Delete Confirmation Modal ── */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        projectTitle={projectToDelete?.name || ''}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
