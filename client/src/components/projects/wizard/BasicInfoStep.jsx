import { Heart, Globe, Lock, ShieldCheck, Terminal, Layers } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: BasicInfoStep.jsx
 * 
 * WHY THIS EXISTS:
 * Step 1 captures the core identity of a project. Names, visibility rules, and category tags
 * shape how the project appears in lists and how permissions are managed down the road.
 * 
 * TEMPLATE CHOICE:
 * Providing quickstarter templates (like GitHub's "Create repository from template") saves developers
 * several hours of initialization time, improving the day-1 developer experience (DX).
 */
export default function BasicInfoStep({ projectData, onChange }) {
  const templates = [
    { id: 'blank', label: 'Blank Project', size: '0.01 KB', icon: Layers },
    { id: 'nestjs', label: 'Nest.js App', size: '12.4 MB', icon: Terminal },
    { id: 'react', label: 'React SPA', size: '8.2 MB', icon: Layers },
    { id: 'nodecli', label: 'Node CLI', size: '1.1 MB', icon: Terminal },
    { id: 'go', label: 'Go Server', size: '3.4 MB', icon: Layers }
  ];

  const colors = [
    '#6366f1', // Indigo
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#8b5cf6'  // Purple
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Form Fields */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-base font-bold text-slate-800">Start a New Project</h3>
        
        {/* Name */}
        <div>
          <label htmlFor="projectName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            required
            placeholder="e.g. Spacecraft Analytics Dash"
            value={projectData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="projectDesc" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDesc"
            rows={3}
            required
            placeholder="Briefly describe the purpose of this project..."
            value={projectData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category & Visibility Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="projectCategory" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Category <span className="text-red-500">*</span>
            </label>
            <select
              id="projectCategory"
              value={projectData.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select Category</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Mobile">Mobile</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Visibility
            </label>
            <div className="flex h-10 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => onChange({ visibility: 'public' })}
                className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                  projectData.visibility === 'public'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Globe size={13} /> Public
              </button>
              <button
                type="button"
                onClick={() => onChange({ visibility: 'private' })}
                className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                  projectData.visibility === 'private'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Lock size={13} /> Private
              </button>
            </div>
          </div>
        </div>

        {/* Favorite & Theme Color selection */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Favorite */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ isFavorite: !projectData.isFavorite })}
              className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-bold transition ${
                projectData.isFavorite
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Heart size={14} className={projectData.isFavorite ? 'fill-current' : ''} />
              {projectData.isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Theme:</span>
            <div className="flex items-center gap-1.5">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange({ themeColor: color })}
                  style={{ backgroundColor: color }}
                  className={`h-5 w-5 rounded-full border border-white ring-offset-1 transition ${
                    projectData.themeColor === color ? 'ring-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={`Select theme color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Templates Selection */}
        <div className="pt-4 border-t border-gray-100">
          <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select a Starting Template
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const isSelected = projectData.templateId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => onChange({ templateId: tpl.id })}
                  className={`flex flex-col items-center justify-between rounded-xl border p-3.5 text-center transition ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/20 text-indigo-700 shadow-sm shadow-indigo-100/50'
                      : 'border-gray-200 bg-white text-slate-500 hover:border-indigo-100 hover:bg-indigo-50/10'
                  }`}
                >
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-tight leading-tight block truncate w-full">
                    {tpl.label}
                  </span>
                  <span className="mt-1 text-[9px] font-semibold text-slate-400 block">
                    {tpl.size}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pro Tip Sidebar Panel */}
      <div className="flex flex-col gap-4 rounded-xl bg-indigo-50/40 border border-indigo-100/40 p-5 lg:col-span-1">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Pro Tip</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-indigo-700 font-medium">
              Templates configure default settings and workspace layouts. You can change these details later in settings.
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-indigo-100/60">
          <h5 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-widest mb-2">Template Footprints</h5>
          <div className="space-y-2 text-[10px] text-indigo-700 font-medium leading-relaxed">
            {templates.map(tpl => (
              <div key={tpl.id} className="flex justify-between border-b border-indigo-100/20 pb-1.5 last:border-0 last:pb-0">
                <span>{tpl.label}</span>
                <span className="font-bold">{tpl.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
