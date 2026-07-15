import { Calendar, GitCommit, DownloadCloud, Clock, Shield, Award } from 'lucide-react';
import { Github } from '../common/BrandIcons';

export default function GithubTimelineCard({ project }) {
  if (!project || !project.githubUrl) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not available';
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRepositoryAge = (createdDateStr) => {
    if (!createdDateStr) return 'N/A';
    const created = new Date(createdDateStr);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    
    const diffMonths = Math.floor(diffDays / 30.4375);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    if (remainingMonths === 0) {
      return `${diffYears} yr${diffYears !== 1 ? 's' : ''}`;
    }
    return `${diffYears} yr${diffYears !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  };

  const timelineEvents = [
    {
      key: 'repo-created',
      title: 'Repository Created',
      date: project.repositoryCreatedAt,
      description: 'First commit pushed to GitHub',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-100'
    },
    {
      key: 'latest-commit',
      title: 'Latest Commit',
      date: project.latestCommitDate || project.lastPushAt,
      description: project.latestCommitMessage 
        ? `"${project.latestCommitMessage.substring(0, 50)}${project.latestCommitMessage.length > 50 ? '...' : ''}" ${project.latestCommitSha ? `(${project.latestCommitSha.substring(0, 7)})` : ''}`
        : 'No recent commit description',
      icon: GitCommit,
      color: 'bg-primary-50 text-primary-600 border border-primary-100'
    },
    {
      key: 'project-imported',
      title: 'Project Imported',
      date: project.createdAt,
      description: 'Repository connected to DevNote workspace',
      icon: DownloadCloud,
      color: 'bg-purple-50 text-purple-600 border border-purple-100'
    },
    {
      key: 'project-created',
      title: 'Project Created',
      date: project.startDate || project.createdAt,
      description: 'DevNote workspace initialization',
      icon: Clock,
      color: 'bg-slate-50 text-slate-600 border border-slate-100'
    }
  ].filter(e => e.date); // Only show events with dates

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Title */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-slate-700" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            GitHub Timeline
          </h3>
        </div>
        {project.primaryLanguage && (
          <span className="text-[9px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-lg">
            {project.primaryLanguage}
          </span>
        )}
      </div>

      {/* Repo Stats Summary */}
      <div className="mb-5 grid grid-cols-2 gap-3 border-b border-slate-50 pb-4">
        <div>
          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Repository Age</span>
          <span className="text-xs font-extrabold text-slate-800">
            {getRepositoryAge(project.repositoryCreatedAt)}
          </span>
        </div>
        {project.license && (
          <div>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">License</span>
            <span className="text-xs font-extrabold text-slate-800 truncate block" title={project.license}>
              {project.license}
            </span>
          </div>
        )}
      </div>

      {/* Owner Badge */}
      {project.ownerName && (
        <div className="mb-5 flex items-center gap-2 bg-slate-50/50 rounded-xl p-2.5 border border-slate-100">
          {project.ownerAvatar ? (
            <img 
              src={project.ownerAvatar} 
              alt={project.ownerName} 
              className="h-6 w-6 rounded-full border border-slate-200" 
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
              {project.ownerName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Repository Owner</span>
            <a 
              href={`https://github.com/${project.ownerName}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold text-slate-700 hover:text-primary-600 truncate mt-0.5"
            >
              @{project.ownerName}
            </a>
          </div>
        </div>
      )}

      {/* Timeline List */}
      <div className="relative border-l border-slate-100 pl-4 ml-2.5 space-y-5">
        {timelineEvents.map((event, idx) => {
          const Icon = event.icon;
          return (
            <div key={event.key} className="relative">
              {/* Event Marker Dot */}
              <span className={`absolute -left-[27px] top-0.5 rounded-full p-1 ${event.color}`}>
                <Icon size={10} />
              </span>

              {/* Event Details */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">
                    {event.title}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {formatDate(event.date)}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
