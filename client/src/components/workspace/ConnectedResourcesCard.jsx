import { Link2, Github, ExternalLink } from 'lucide-react';

export default function ConnectedResourcesCard({ githubUrl, figmaUrl, apiDocUrl, postmanUrl }) {
  // Check if any link is present
  const hasLinks = githubUrl || figmaUrl || apiDocUrl || postmanUrl;
  if (!hasLinks) return null;

  const links = [
    { label: 'GitHub', url: githubUrl, icon: Github },
    { label: 'Figma', url: figmaUrl, icon: Link2 },
    { label: 'API Docs', url: apiDocUrl, icon: Link2 },
    { label: 'Postman', url: postmanUrl, icon: Link2 },
  ].filter(link => link.url && link.url.trim() !== '');

  if (links.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Connected Resources
      </h3>
      <div className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3 text-xs font-bold text-slate-700 transition hover:border-primary-100 hover:bg-slate-50"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon size={16} className="text-slate-400 shrink-0" />
                <span className="truncate">{link.label}</span>
              </div>
              <ExternalLink size={12} className="text-slate-400 shrink-0 ml-2" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
