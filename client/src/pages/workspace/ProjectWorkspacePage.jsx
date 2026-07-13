import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Braces, ClipboardList, Settings, CheckCircle2, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';

// Layout & Common
import WorkspaceHeader from '../../components/workspace/WorkspaceHeader';
import ProjectHeader from '../../components/workspace/ProjectHeader';
import ProjectStats from '../../components/workspace/ProjectStats';
import WorkspaceTabs from '../../components/workspace/WorkspaceTabs';
import WorkspaceFooter from '../../components/workspace/WorkspaceFooter';
import ComingSoonTab from '../../components/workspace/ComingSoonTab';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';

// Left Column — Overview content
import ProjectSummary from '../../components/workspace/ProjectSummary';
import CompletionCard from '../../components/workspace/CompletionCard';
import UpcomingDeadlines from '../../components/workspace/UpcomingDeadlines';
import RecentActivity from '../../components/workspace/RecentActivity';

// Right Sidebar
import HealthScoreCard from '../../components/workspace/HealthScoreCard';
import TimelineAlertsCard from '../../components/workspace/TimelineAlertsCard';
import ConnectedResourcesCard from '../../components/workspace/ConnectedResourcesCard';
import TechnologyStackCard from '../../components/workspace/TechnologyStackCard';
import TeamMembersCard from '../../components/workspace/TeamMembersCard';

// Notes Tab
import NotesTab from '../../components/workspace/notes/NotesTab';

// Environment Tab
import EnvironmentTab from '../../components/workspace/environment/EnvironmentTab';

// API Service
import { projectService } from '../../services/api/projectService';

const COMING_SOON_TABS = {
  tasks: {
    title: 'Tasks',
    description: 'Plan, assign, and track project work from inside your DevNote workspace.',
    icon: ClipboardList,
    features: [
      'Create Tasks',
      'Assign Members',
      'Priority Levels',
      'Due Dates',
      'Kanban Board',
      'Progress Tracking',
    ],
  },
  apis: {
    title: 'APIs',
    description: 'Document endpoints, examples, authentication, and test flows for your project APIs.',
    icon: Braces,
    features: [
      'API Collection',
      'Endpoint Documentation',
      'Request & Response Examples',
      'Authentication Guide',
      'Import Postman Collection',
      'API Testing',
    ],
  },
  settings: {
    title: 'Settings',
    description: 'Manage project-level preferences, permissions, notifications, and lifecycle actions.',
    icon: Settings,
    features: [
      'Project Preferences',
      'Team Permissions',
      'Notification Settings',
      'Archive Project',
      'Danger Zone',
      'Activity Logs',
    ],
  },
};

const themeColorMap = {
  '#6366f1': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  '#3b82f6': 'bg-blue-50 text-blue-700 border-blue-100',
  '#10b981': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  '#f59e0b': 'bg-amber-50 text-amber-700 border-amber-100',
  '#ef4444': 'bg-red-50 text-red-700 border-red-100',
  '#ec4899': 'bg-pink-50 text-pink-700 border-pink-100',
  '#8b5cf6': 'bg-purple-50 text-purple-700 border-purple-100',
};

const membersList = [
  { id: 1, name: 'Elena Rodriguez', role: 'Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 2, name: 'James Wilson', role: 'Backend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 3, name: 'Jordan Kyosho', role: 'Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
  { id: 4, name: 'Sarah Jenkins', role: 'QA Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
];

export default function ProjectWorkspacePage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const comingSoonTab = COMING_SOON_TABS[activeTab];

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectService.getProjectById(projectId);
      if (res.success) {
        setProject(res.data);
      } else {
        const errMessage = res.message || 'Failed to retrieve project details.';
        setError({ status: 500, message: errMessage });
        toast.error(errMessage);
      }
    } catch (err) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.message || err.message || 'Server connection error';
      setError({ status, message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId, fetchProject]);

  const handleFavoriteToggle = async () => {
    if (!project) return;
    try {
      // Optimistic update
      const updatedProject = { ...project, isFavorite: !project.isFavorite };
      setProject(updatedProject);

      const res = await projectService.favoriteProject(projectId);
      if (res.success) {
        toast.success(`Project ${updatedProject.isFavorite ? 'favorited' : 'unfavorited'} successfully`);
      } else {
        // Rollback on failure
        setProject(project);
        toast.error(res.message || 'Failed to update favorite status');
      }
    } catch (err) {
      // Rollback on failure
      setProject(project);
      toast.error('An error occurred while updating favorite status');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
        <WorkspaceHeader projectName="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
        <WorkspaceFooter />
      </div>
    );
  }

  if (error && error.status === 404) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
        <WorkspaceHeader projectName="Project Not Found" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Project Not Found</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            The project workspace you are trying to access does not exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 active:scale-95"
          >
            Back to Projects
          </button>
        </div>
        <WorkspaceFooter />
      </div>
    );
  }

  if (error && error.status === 403) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
        <WorkspaceHeader projectName="Access Forbidden" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 border border-red-100 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Access Forbidden</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            You do not have permission to view this project workspace.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 active:scale-95"
          >
            Back to Projects
          </button>
        </div>
        <WorkspaceFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
        <WorkspaceHeader projectName="Error" />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <ErrorState message={error.message || 'We ran into an issue connecting to the database server.'} onRetry={fetchProject} />
          </div>
        </div>
        <WorkspaceFooter />
      </div>
    );
  }

  if (!project) return null;

  // Compute initials and color
  const initials = project.name
    ? project.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'DP';
  const initialsColor = themeColorMap[project.themeColor] || 'bg-indigo-50 text-indigo-700 border-indigo-100';

  // Compute project stats
  const getProjectStats = (proj) => {
    let progress = '0%';
    if (proj.status === 'Completed') progress = '100%';
    else if (proj.status === 'In Review') progress = '75%';
    else if (proj.status === 'In Progress') progress = '50%';

    let daysLeft = 'No Deadline';
    if (proj.deadline) {
      const diffTime = new Date(proj.deadline) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysLeft = diffDays > 0 ? `${diffDays} days` : 'Overdue';
    }

    const stackStr = proj.techStack && proj.techStack.length > 0
      ? proj.techStack.slice(0, 2).join(', ')
      : 'None';

    const updatedStr = proj.updatedAt
      ? new Date(proj.updatedAt).toLocaleDateString()
      : 'Recently';

    return [
      { id: 'status',    label: 'STATUS',     value: proj.status || 'Todo',       valueColor: 'text-primary-600' },
      { id: 'progress',  label: 'PROGRESS',   value: progress,                    valueColor: 'text-slate-800' },
      { id: 'priority',  label: 'PRIORITY',   value: proj.priority || 'Medium',   valueColor: 'text-slate-800' },
      { id: 'days',      label: 'DAYS LEFT',  value: daysLeft,                    valueColor: 'text-amber-600' },
      { id: 'stack',     label: 'STACK',      value: stackStr,                    valueColor: 'text-slate-800' },
      { id: 'updated',   label: 'UPDATED',    value: updatedStr,                  valueColor: 'text-slate-800' },
    ];
  };

  // Compute overall percent & modules
  const overallPercent = project.status === 'Completed' ? 100 : (project.status === 'In Review' ? 75 : (project.status === 'In Progress' ? 50 : 0));
  const modules = [
    { id: 1, name: 'Project Implementation', progress: overallPercent, color: 'bg-primary-500' }
  ];

  // Compute deadlines
  const deadlines = [];
  if (project.deadline) {
    deadlines.push({
      id: 1,
      title: 'Target Deadline',
      dueDate: new Date(project.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      isPrimary: true
    });
  }
  if (project.startDate) {
    deadlines.push({
      id: 2,
      title: 'Kickoff / Start',
      dueDate: new Date(project.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      isPrimary: false
    });
  }

  // Compute recent activity
  const activities = [
    {
      id: 1,
      icon: CheckCircle2,
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-600',
      title: 'Project initialized',
      highlight: `"${project.name}" was successfully created.`,
      time: new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }
  ];
  if (project.updatedAt && project.updatedAt !== project.createdAt) {
    activities.unshift({
      id: 2,
      icon: Rocket,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      title: 'Project profile updated',
      highlight: 'Project details were updated in settings.',
      time: new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    });
  }

  // Compute health score
  const getHealthScore = (proj) => {
    let score = 'Healthy';
    let riskLabel = 'Low Risk Index';
    if (proj.priority === 'Critical' || proj.priority === 'High') {
      score = 'At Risk';
      riskLabel = 'High Priority Action Needed';
    }
    const docsStatus = proj.apiDocUrl ? 'Linked' : 'Missing Docs';
    return { score, riskLabel, docsStatus };
  };
  const healthScore = getHealthScore(project);

  // Compute tech stack
  const stackColors = [
    'bg-orange-50 text-orange-700 border-orange-200',
    'bg-primary-50 text-primary-700 border-primary-200',
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-red-50 text-red-700 border-red-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-pink-50 text-pink-700 border-pink-200',
  ];
  const techStack = (project.techStack || []).map((name, index) => ({
    id: index,
    name,
    color: stackColors[index % stackColors.length]
  }));

  // Resolve team members including owner
  const projectMembers = [];
  if (project.owner) {
    projectMembers.push({
      id: project.owner._id,
      name: project.owner.name,
      role: 'Owner',
      avatar: project.owner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.owner.name}&backgroundColor=c7d2fe`
    });
  }
  const otherMembersList = (project.teamMembers || []).map(idOrObj => {
    if (typeof idOrObj === 'object' && idOrObj !== null) return idOrObj;
    return membersList.find(m => m.id === Number(idOrObj)) || { id: idOrObj, name: `Member ${idOrObj}`, role: 'Contributor', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${idOrObj}` };
  });
  projectMembers.push(...otherMembersList);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fe]">
      {/* ── Sticky Workspace Top Bar ── */}
      <WorkspaceHeader projectName={project.name} />

      {/* ── Page Body (scrollable) ── */}
      <div className="flex-1">
        {/* Project Identity */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <ProjectHeader
            initials={initials}
            initialsColor={initialsColor}
            name={project.name}
            status={project.status || 'Todo'}
            description={project.description}
            isFavorite={project.isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
          />
          <ProjectStats stats={getProjectStats(project)} />
          <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* ── Overview Tab Content ── */}
        {activeTab === 'overview' && (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              {/* ── Left Column ── */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <ProjectSummary
                  fullDescription={project.description}
                  tags={[project.category, project.priority, project.visibility].filter(Boolean)}
                  tagStyles={{
                    [project.category]: 'bg-slate-100 text-slate-600 border-slate-200',
                    [project.priority]: 'bg-primary-100 text-primary-700 border-primary-200',
                    [project.visibility]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                  }}
                />

                {/* Completion + Deadlines — side by side on md screens */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CompletionCard
                    overallPercent={overallPercent}
                    modules={modules}
                  />
                  <UpcomingDeadlines deadlines={deadlines} />
                </div>

                <RecentActivity activities={activities} />
              </div>

              {/* ── Right Sidebar ── */}
              <div className="flex flex-col gap-6 lg:col-span-1">
                <HealthScoreCard
                  score={healthScore.score}
                  riskLabel={healthScore.riskLabel}
                  docsStatus={healthScore.docsStatus}
                />
                <TimelineAlertsCard
                  startDate={project.startDate}
                  deadline={project.deadline}
                  estimatedDuration={project.estimatedDuration}
                  reminderToggle={project.reminderToggle}
                  reminderDaysBefore={project.reminderDaysBefore}
                  priority={project.priority}
                />
                <ConnectedResourcesCard
                  githubUrl={project.githubUrl}
                  figmaUrl={project.figmaUrl}
                  apiDocUrl={project.apiDocUrl}
                  postmanUrl={project.postmanUrl}
                />
                <TechnologyStackCard stack={techStack} />
                <TeamMembersCard members={projectMembers} />
              </div>

            </div>
          </div>
        )}

        {/* ── Notes Tab Content ── */}
        {activeTab === 'notes' && <NotesTab />}

        {/* ── Environment Tab Content ── */}
        {activeTab === 'environment' && <EnvironmentTab />}

        {/* ── Coming Soon Tabs ── */}
        {comingSoonTab && (
          <ComingSoonTab
            title={comingSoonTab.title}
            description={comingSoonTab.description}
            features={comingSoonTab.features}
            icon={comingSoonTab.icon}
            onBackToOverview={() => setActiveTab('overview')}
          />
        )}
      </div>

      {/* ── Footer ── */}
      <WorkspaceFooter />
    </div>
  );
}
