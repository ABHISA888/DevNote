import { useState } from 'react';
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
import { STACK_OVERVIEW } from '../../constants/projectsData';

/**
 * ProjectsPage.jsx — Composition Root for /projects
 * 
 * This page contains no internal logic or complex UI markup.
 * It simply imports section components and arranges them in a responsive Grid layout.
 */
export default function ProjectsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative min-h-screen">
      
      {/* ── Header Area ── */}
      <ProjectsHeader onNewProjectClick={() => setIsWizardOpen(true)} />
      
      {/* ── High Level Metrics ── */}
      <StatsCards />
      
      {/* ── Filter & Search Toolbar ── */}
      <ProjectsToolbar />
      
      {/* ── Main 2-Column Split Layout ── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">
        
        {/* Left Column: Projects Feed (approx 66% width on large screens) */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <PinnedProjects />
          <ProjectGrid />
        </div>
        
        {/* Right Column: Context Widgets (approx 33% width on large screens) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RecentlyEdited />
          <StackOverview data={STACK_OVERVIEW} />
          <HelpCard />
        </div>
        
      </div>

      {/* ── Global Action ── */}
      <FloatingActionButton onClick={() => setIsWizardOpen(true)} />

      {/* ── Create Project Wizard Modal ── */}
      <CreateProjectWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />

    </div>
  );
}

