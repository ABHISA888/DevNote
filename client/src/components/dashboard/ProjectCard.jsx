import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ProjectCard.jsx
 * 
 * WHY THIS EXISTS:
 * Renders rich project entities. It handles its own internal layout (thumbnail top, 
 * content middle, footer actions) so the parent grid only has to pass data.
 */
export default function ProjectCard({ id, title, description, badges, thumbnailColor, deploymentUrl }) {
  const navigate = useNavigate();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-lg hover:border-primary-100">
      
      {/* Mock Image / Thumbnail Area */}
      <div className={`h-36 w-full ${thumbnailColor} flex items-center justify-center relative overflow-hidden`}>
        {/* We place a simple mockup UI element inside since we don't have real images. */}
        <div className="absolute inset-0 bg-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="h-20 w-32 rounded-md bg-white shadow-sm border border-gray-100 p-2 opacity-80 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
          <div className="h-2 w-16 bg-gray-200 rounded mb-2"></div>
          <div className="h-1.5 w-24 bg-gray-100 rounded mb-1"></div>
          <div className="h-1.5 w-20 bg-gray-100 rounded mb-1"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        {/* Tech Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span 
              key={badge}
              className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="mt-5 flex gap-2">
          <button 
            onClick={() => navigate(`/project/${id}`)}
            className="flex-1 rounded-lg bg-primary-50 py-2 text-xs font-bold text-primary-600 transition hover:bg-primary-100 hover:text-primary-700"
          >
            Open Project
          </button>
          {deploymentUrl && (
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-100 hover:text-emerald-700"
            >
              Live Demo <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
