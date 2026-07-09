import { Github, Figma, Link2, BookOpen, Layers } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: IntegrationsStep.jsx
 * 
 * WHY THIS EXISTS:
 * Integrating third-party platforms (GitHub, Figma, Postman) centralizes references.
 * Instead of searching bookmarks, a developer can click straight from the DevNote workspace page
 * to repository branches, design mockups, or endpoints.
 * 
 * DESIGN DETAILS:
 * - Brand color highlights on focus (e.g. GitHub dark, Figma purple/orange, Postman orange).
 * - Integration links are fully optional but structured correctly as URL validations later.
 */
export default function IntegrationsStep({ projectData, onChange }) {
  const integrations = [
    {
      key: 'githubUrl',
      label: 'GitHub Repository',
      placeholder: 'e.g. https://github.com/username/repo',
      icon: Github,
      color: 'text-slate-800'
    },
    {
      key: 'figmaUrl',
      label: 'Figma Workspace URL',
      placeholder: 'e.g. https://figma.com/file/...',
      icon: Figma,
      color: 'text-orange-500'
    },
    {
      key: 'apiDocUrl',
      label: 'API Documentation URL',
      placeholder: 'e.g. https://api.project.com/docs',
      icon: BookOpen,
      color: 'text-primary-500'
    },
    {
      key: 'postmanUrl',
      label: 'Postman Collection URL',
      placeholder: 'e.g. https://postman.com/workspace/...',
      icon: Link2,
      color: 'text-orange-600'
    },
    {
      key: 'deploymentUrl',
      label: 'Deployment URL (Optional)',
      placeholder: 'e.g. https://project.vercel.app',
      icon: Layers,
      color: 'text-primary-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Integrations Inputs */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-base font-bold text-slate-800">Connected Resources</h3>
        <p className="text-xs text-slate-500 font-medium -mt-2.5">
          Connect external project endpoints, design boards, and repositories to centralize your workspace.
        </p>

        <div className="space-y-3.5">
          {integrations.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label htmlFor={field.key} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Icon size={14} className={field.color} />
                  {field.label}
                </label>
                <input
                  id={field.key}
                  type="url"
                  placeholder={field.placeholder}
                  value={projectData[field.key]}
                  onChange={(e) => onChange({ [field.key]: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Connection Help Card */}
      <div className="flex flex-col gap-4 rounded-xl bg-primary-50/40 border border-primary-100/40 p-5 lg:col-span-1 h-fit">
        <div className="flex items-start gap-2.5">
          <Link2 size={18} className="text-primary-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-primary-900 uppercase tracking-wider">Sync & Integrations</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-primary-700 font-medium">
              Connecting resources creates dynamic references on your project overview screen, allowing team members to quickly fetch docs and assets.
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-primary-100/60 space-y-2 text-[10px] text-slate-500 font-semibold leading-relaxed">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            <span>All fields are completely optional.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            <span>URLs can be updated anytime inside workspace settings.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
