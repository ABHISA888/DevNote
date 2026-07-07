import { Pencil, Calendar, AlertCircle, Layers, Github, Figma, BookOpen, Link2 } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ReviewStep.jsx
 * 
 * WHY THIS EXISTS:
 * A review step allows users to verify their configuration before committing it.
 * This decreases validation errors on submission and increases user confidence.
 * 
 * DESIGN DETAILS:
 * - "Edit" pencil triggers let users hop directly back to relevant steps, minimizing effort.
 */
export default function ReviewStep({ projectData, onEditStep }) {
  const integrationIcons = {
    githubUrl: Github,
    figmaUrl: Figma,
    apiDocUrl: BookOpen,
    postmanUrl: Link2,
    deploymentUrl: Layers
  };

  const integrationLabels = {
    githubUrl: 'GitHub Repository',
    figmaUrl: 'Figma Workspace',
    apiDocUrl: 'API Documentation',
    postmanUrl: 'Postman Collection',
    deploymentUrl: 'Deployment Endpoint'
  };

  // Check if any integrations were filled
  const hasIntegrations = ['githubUrl', 'figmaUrl', 'apiDocUrl', 'postmanUrl', 'deploymentUrl'].some(
    (key) => !!projectData[key]
  );

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto py-2">
        <h3 className="text-base font-extrabold text-slate-800">Final Project Review</h3>
        <p className="mt-1 text-xs text-slate-500 font-semibold leading-relaxed">
          Double-check your configurations. You can change these details later inside workspace settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Details Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Basic Project Details</h4>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              <Pencil size={11} /> Edit
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project Name</span>
              <span className="text-sm font-bold text-slate-800">{projectData.name}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Description</span>
              <p className="text-xs leading-relaxed text-slate-500 font-medium">{projectData.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</span>
                <span className="text-xs font-semibold text-slate-700">{projectData.category}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visibility</span>
                <span className="text-xs font-semibold text-slate-700 capitalize">{projectData.visibility}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Duration Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Project Schedule</h4>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              <Pencil size={11} /> Edit
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Priority</span>
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-1 ${
                  projectData.priority === 'High'
                    ? 'bg-red-50 text-red-600 border border-red-100'
                    : projectData.priority === 'Medium'
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    : 'bg-slate-50 text-slate-500 border border-slate-200'
                }`}>
                  {projectData.priority} Priority
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
                <span className="inline-flex items-center rounded-md bg-slate-50 border border-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-1 text-slate-600">
                  {projectData.status || 'Todo'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Start Date</span>
                <span className="text-xs font-semibold text-slate-700">{projectData.startDate || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Deadline</span>
                <span className="text-xs font-semibold text-slate-700">{projectData.deadline}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Duration</span>
              <span className="text-xs font-semibold text-slate-700">{projectData.estimatedDuration || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Tech Stack</h4>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              <Pencil size={11} /> Edit
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {projectData.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Resources Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Connected Resources</h4>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              <Pencil size={11} /> Edit
            </button>
          </div>

          {hasIntegrations ? (
            <div className="space-y-2.5">
              {['githubUrl', 'figmaUrl', 'apiDocUrl', 'postmanUrl', 'deploymentUrl'].map((key) => {
                const url = projectData[key];
                if (!url) return null;
                const Icon = integrationIcons[key];
                return (
                  <div key={key} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-600">{integrationLabels[key]}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600 truncate max-w-[200px]" title={url}>
                      {url}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 py-2 text-slate-400">
              <AlertCircle size={14} />
              <span className="text-xs font-medium">No connected resources selected.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
