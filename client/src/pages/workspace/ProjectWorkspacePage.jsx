import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Layout
import WorkspaceHeader from '../../components/workspace/WorkspaceHeader';
import ProjectHeader from '../../components/workspace/ProjectHeader';
import ProjectStats from '../../components/workspace/ProjectStats';
import WorkspaceTabs from '../../components/workspace/WorkspaceTabs';
import WorkspaceFooter from '../../components/workspace/WorkspaceFooter';

// Left Column — Overview content
import ProjectSummary from '../../components/workspace/ProjectSummary';
import CompletionCard from '../../components/workspace/CompletionCard';
import UpcomingDeadlines from '../../components/workspace/UpcomingDeadlines';
import RecentActivity from '../../components/workspace/RecentActivity';

// Right Sidebar
import HealthScoreCard from '../../components/workspace/HealthScoreCard';
import TaskSnapshotCard from '../../components/workspace/TaskSnapshotCard';
import TechnologyStackCard from '../../components/workspace/TechnologyStackCard';
import TeamMembersCard from '../../components/workspace/TeamMembersCard';

// Tasks Tab
import TasksTab from '../../components/workspace/tasks/TasksTab';

// Notes Tab
import NotesTab from '../../components/workspace/notes/NotesTab';

// APIs Tab
import ApisTab from '../../components/workspace/apis/ApisTab';

// Environment Tab
import EnvironmentTab from '../../components/workspace/environment/EnvironmentTab';

// Data
import {
  PROJECT_INFO,
  PROJECT_STATS,
  COMPLETION_DATA,
  UPCOMING_DEADLINES,
  RECENT_ACTIVITY,
  HEALTH_SCORE,
  TASK_SNAPSHOT,
  TECH_STACK,
  TEAM_MEMBERS,
} from '../../constants/workspaceData';

/**
 * 🎓 TEACHING MOMENT: ProjectWorkspacePage.jsx — Composition Root
 *
 * WHY THIS EXISTS:
 * This file is the ORCHESTRATOR. It holds:
 *   1. Route params  → useParams() gets the projectId from the URL
 *   2. Tab state     → local useState tracks the active tab
 *   3. Layout shell  → assembles all section components into the 2-column grid
 *
 * COMPONENT HIERARCHY:
 *
 * ProjectWorkspacePage
 * ├── WorkspaceHeader    (breadcrumb + search)
 * ├── ProjectHeader      (identity block)
 * ├── ProjectStats       (stat row)
 * ├── WorkspaceTabs      (tab nav)
 * └── [Overview Grid]
 *     ├── LEFT  (lg:col-span-2)
 *     │   ├── ProjectSummary
 *     │   ├── [CompletionCard + UpcomingDeadlines — side by side on md+]
 *     │   └── RecentActivity
 *     └── RIGHT (lg:col-span-1)
 *         ├── HealthScoreCard
 *         ├── TaskSnapshotCard
 *         ├── TechnologyStackCard
 *         └── TeamMembersCard
 *
 * FUTURE NAVIGATION:
 * When other tabs are built:
 *   const navigate = useNavigate();
 *   const handleTabChange = (tabId) => navigate(`/project/${projectId}/${tabId}`);
 * The WorkspaceTabs component is already wired to accept this handler.
 */
export default function ProjectWorkspacePage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
      {/* ── Sticky Workspace Top Bar ── */}
      <WorkspaceHeader projectName={PROJECT_INFO.name} />

      {/* ── Page Body (scrollable) ── */}
      <div className="flex-1">
        {/* Project Identity */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <ProjectHeader
            initials={PROJECT_INFO.initials}
            initialsColor={PROJECT_INFO.initialsColor}
            name={PROJECT_INFO.name}
            status={PROJECT_INFO.status}
            description={PROJECT_INFO.description}
            isFavorite={PROJECT_INFO.isFavorite}
          />
          <ProjectStats stats={PROJECT_STATS} />
          <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* ── Overview Tab Content ── */}
        {activeTab === 'overview' && (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              {/* ── Left Column ── */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <ProjectSummary
                  fullDescription={PROJECT_INFO.fullDescription}
                  tags={PROJECT_INFO.tags}
                  tagStyles={PROJECT_INFO.tagStyles}
                />

                {/* Completion + Deadlines — side by side on md screens */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CompletionCard
                    overallPercent={COMPLETION_DATA.overallPercent}
                    modules={COMPLETION_DATA.modules}
                  />
                  <UpcomingDeadlines deadlines={UPCOMING_DEADLINES} />
                </div>

                <RecentActivity activities={RECENT_ACTIVITY} />
              </div>

              {/* ── Right Sidebar ── */}
              <div className="flex flex-col gap-6 lg:col-span-1">
                <HealthScoreCard
                  score={HEALTH_SCORE.score}
                  riskLabel={HEALTH_SCORE.riskLabel}
                  docsStatus={HEALTH_SCORE.docsStatus}
                />
                <TaskSnapshotCard snapshot={TASK_SNAPSHOT} />
                <TechnologyStackCard stack={TECH_STACK} />
                <TeamMembersCard members={TEAM_MEMBERS} />
              </div>

            </div>
          </div>
        )}

        {/* ── Tasks Tab Content ── */}
        {activeTab === 'tasks' && <TasksTab />}

        {/* ── Notes Tab Content ── */}
        {activeTab === 'notes' && <NotesTab />}

        {/* ── APIs Tab Content ── */}
        {activeTab === 'apis' && <ApisTab />}

        {/* ── Environment Tab Content ── */}
        {activeTab === 'environment' && <EnvironmentTab />}

        {/* ── Placeholder for other tabs ── */}
        {activeTab !== 'overview' && activeTab !== 'tasks' && activeTab !== 'notes' && activeTab !== 'apis' && activeTab !== 'environment' && (
          <div className="flex items-center justify-center py-32 text-slate-400">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-600 capitalize">{activeTab}</p>
              <p className="mt-2 text-sm">This tab will be implemented next.</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <WorkspaceFooter />
    </div>
  );
}
