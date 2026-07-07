import { useState } from 'react';
import { Search, Flame, Clock, Info } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: ConfigurationStep.jsx
 * 
 * WHY THIS EXISTS:
 * Aligning the project with the correct tech stack and setting developer priorities early
 * establishes clean dashboard filters.
 * 
 * DESIGN DETAILS:
 * - Tech badges act as toggles. Clicking one adds or removes it from the array.
 * - Priority is represented as high-contrast selection pills (Red, Indigo, Slate).
 */
export default function ConfigurationStep({ projectData, onChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const suggestedTechs = [
    'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 
    'TypeScript', 'Python', 'Go', 'Docker', 'MongoDB', 
    'Redis', 'GraphQL', 'OpenAI', 'Swift', 'Kotlin', 'Rust'
  ];

  const handleTechToggle = (tech) => {
    const isSelected = projectData.techStack.includes(tech);
    let updatedStack;
    if (isSelected) {
      updatedStack = projectData.techStack.filter((t) => t !== tech);
    } else {
      updatedStack = [...projectData.techStack, tech];
    }
    onChange({ techStack: updatedStack });
  };

  const filteredTechs = suggestedTechs.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const priorities = ['High', 'Medium', 'Low'];
  const priorityStyles = {
    High: 'bg-red-600 border-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-100',
    Medium: 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100',
    Low: 'bg-slate-700 border-slate-700 text-white hover:bg-slate-800 shadow-sm shadow-slate-100'
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Configuration Inputs */}
      <div className="lg:col-span-2 space-y-5">
        <h3 className="text-base font-bold text-slate-800">Configure Stack</h3>

        {/* Tech Stack Selector */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Technologies <span className="text-red-500">*</span>
          </label>
          
          {/* Search Input */}
          <div className="relative mb-3.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={14} />
            </div>
            <input
              type="text"
              placeholder="Search technologies (e.g. React, Docker...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Technology Badges Grid */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredTechs.map((tech) => {
              const isSelected = projectData.techStack.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50'
                      : 'border-gray-200 bg-white text-slate-600 hover:border-indigo-100 hover:bg-indigo-50/10'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
            {filteredTechs.length === 0 && (
              <span className="text-xs font-medium text-slate-400 py-1">No matches found for "{searchTerm}"</span>
            )}
          </div>

          {/* Selected stack tags helper list */}
          {projectData.techStack.length > 0 && (
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Selected Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {projectData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded bg-indigo-100/70 border border-indigo-200 px-2 py-0.5 text-[10px] font-bold text-indigo-700"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleTechToggle(tech)}
                      className="ml-1 text-[11px] font-black text-indigo-500 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Project Priority
          </label>
          <div className="flex gap-2.5 max-w-md">
            {priorities.map((priority) => {
              const isSelected = projectData.priority === priority;
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => onChange({ priority })}
                  className={`flex-1 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                    isSelected
                      ? priorityStyles[priority]
                      : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {priority}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimated Duration */}
        <div>
          <label htmlFor="estDuration" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Estimated Duration / Time Estimate
          </label>
          <div className="relative">
            <input
              id="estDuration"
              type="text"
              placeholder="e.g. 3 months, 6 weeks, etc."
              value={projectData.estimatedDuration}
              onChange={(e) => onChange({ estimatedDuration: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Developer Tip Sidebar */}
      <div className="flex flex-col gap-4 rounded-xl bg-indigo-50/40 border border-indigo-100/40 p-5 lg:col-span-1 h-fit">
        <div className="flex items-start gap-2.5">
          <Flame size={18} className="text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Developer Tip</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-indigo-700 font-medium">
              Base stack selection sets up default language and dependency checks inside environment vaults and API documentation builders.
            </p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-indigo-100/60 flex items-start gap-2 text-slate-400">
          <Info size={14} className="shrink-0 mt-0.5 text-indigo-600" />
          <span className="text-[10px] leading-relaxed text-slate-500 font-semibold">
            Make sure to choose at least one core framework or library to satisfy workspace validation rules.
          </span>
        </div>
      </div>
    </div>
  );
}
