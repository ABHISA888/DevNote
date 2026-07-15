import { Link2, Calendar, Code2, Palette, CheckCircle2, Shield, Tag, AlertTriangle, ExternalLink } from 'lucide-react';
import { Github, Figma } from '../common/BrandIcons';

export default function ProjectSummary({ project }) {
  if (!project) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const details = [
    { label: 'Category', value: project.category, type: 'badge', colorClass: 'bg-slate-100 text-slate-700 border-slate-200' },
    { label: 'Visibility', value: project.visibility, type: 'badge', colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 capitalize' },
    { label: 'Priority', value: project.priority, type: 'badge', colorClass: project.priority === 'High' || project.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Status', value: project.status, type: 'badge', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Theme Color', value: project.themeColor, type: 'color' },
    { label: 'Start Date', value: formatDate(project.startDate), icon: Calendar },
    { label: 'Deadline', value: formatDate(project.deadline), icon: Calendar },
  ].filter(item => item.value);

  const links = [
    { label: 'GitHub Repository', value: project.githubUrl, icon: Github },
    { label: 'Figma Design', value: project.figmaUrl, icon: Figma },
    { label: 'API Documentation', value: project.apiDocUrl, icon: Link2 },
    { label: 'Postman Collection', value: project.postmanUrl, icon: Link2 },
  ].filter(item => item.value);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Project Details</h2>
          <p className="text-xs text-slate-400 mt-0.5">Overview & metadata of {project.name}</p>
        </div>
        {project.themeColor && (
          <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50/50 px-2.5 py-1 text-xs font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.themeColor }} />
            <span className="font-mono text-[10px] uppercase text-slate-500">{project.themeColor}</span>
          </div>
        )}
      </div>

      {project.description && (
        <div className="mt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50/30 border border-slate-100/80 p-3 rounded-xl">
            {project.description}
          </p>
        </div>
      )}

      {/* Grid metadata */}
      {details.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Metadata Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50/10 p-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                {item.type === 'badge' ? (
                  <span className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${item.colorClass}`}>
                    {item.value}
                  </span>
                ) : item.type === 'color' ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: item.value }} />
                    <span className="text-xs font-bold text-slate-700 uppercase font-mono">{item.value}</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-700">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 flex items-center gap-1.5"
              >
                <Code2 size={12} className="text-slate-400" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Connected Resources / Links */}
      {links.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Links & Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-lg bg-slate-50 p-2 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                      <Icon size={14} />
                    </span>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition">{link.label}</span>
                  </div>
                  <ExternalLink size={12} className="text-slate-400 group-hover:text-indigo-600 transition" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
