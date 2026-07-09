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
export default function ProjectsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <ProjectsToolbar />
          
          {/* ── Main 2-Column Split Layout ── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">
            
            {/* Left Column: Projects Feed */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <PinnedProjects projects={projects} />
              <ProjectGrid projects={projects} />
            </div>
            
            {/* Right Column: Context Widgets */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <RecentlyEdited />
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

    </div>
  );
}
