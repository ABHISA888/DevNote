import { Heart, Globe, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: BasicInfoStep.jsx
 *
 * WHY THIS EXISTS:
 * Step 1 captures the core identity of a project. Names, visibility rules,
 * and category tags shape how the project appears in lists and how
 * permissions are managed down the road.
 *
 * LAYOUT DECISIONS (after template removal):
 * - Description textarea is 4 rows (up from 3) — the richest free-text field
 *   benefits from vertical breathing room and now fills the gap cleanly.
 * - Favourite is kept as a dedicated quick-access control below the core
 *   project metadata.
 * - The Pro Tip sidebar replaces the Template Footprints table with a
 *   Setup Checklist so the right column stays balanced against the left.
 */
export default function BasicInfoStep({ projectData, onChange }) {
  const setupChecklist = [
    'Use a clear, descriptive name so teammates can identify it at a glance.',
    'Write a concise description capturing the purpose and scope.',
    'Pick the correct category — it drives search filters across the dashboard.',
    'Set visibility carefully. Private projects are only accessible to invited members.',
    'Mark as Favourite to pin it to your quick-access feed.',
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

      {/* ── Form Fields — left 2 columns ───────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">
        <h3 className="text-base font-bold text-slate-800">Start a New Project</h3>

        {/* Project Name */}
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
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Description — 4 rows gives comfortable writing space */}
        <div>
          <label htmlFor="projectDesc" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDesc"
            rows={4}
            required
            placeholder="Briefly describe the purpose of this project..."
            value={projectData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Category & Visibility — 2-column row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="projectCategory" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Category <span className="text-red-500">*</span>
            </label>
            <select
              id="projectCategory"
              value={projectData.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
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
                    ? 'bg-primary-600 text-white'
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
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Lock size={13} /> Private
              </button>
            </div>
          </div>
        </div>

        {/* Favourite toggle */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Favourite
          </label>
          <button
            type="button"
            onClick={() => onChange({ isFavorite: !projectData.isFavorite })}
            className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-xs font-bold transition sm:w-1/2 ${
              projectData.isFavorite
                ? 'border-primary-200 bg-primary-50 text-primary-600 shadow-sm'
                : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Heart size={14} className={projectData.isFavorite ? 'fill-current' : ''} />
            {projectData.isFavorite ? 'Marked as Favourite' : 'Add to Favourites'}
          </button>
        </div>
      </div>

      {/* ── Pro Tip Sidebar — right column ─────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-xl bg-primary-50/40 border border-primary-100/40 p-5 lg:col-span-1">
        {/* Header */}
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-primary-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-primary-900 uppercase tracking-wider">Pro Tip</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-primary-700 font-medium">
              A well-described project saves hours of onboarding time for every collaborator who joins later.
            </p>
          </div>
        </div>

        {/* Setup Checklist — replaces Template Footprints, keeps sidebar balanced */}
        <div className="pt-4 border-t border-primary-100/60">
          <h5 className="text-[10px] font-extrabold text-primary-900 uppercase tracking-widest mb-3">
            Setup Checklist
          </h5>
          <ul className="space-y-2.5">
            {setupChecklist.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-[10px] text-primary-700 font-medium leading-relaxed">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-primary-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
