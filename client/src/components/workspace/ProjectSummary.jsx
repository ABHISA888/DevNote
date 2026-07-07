/**
 * 🎓 TEACHING MOMENT: ProjectSummary.jsx
 *
 * WHY THIS EXISTS:
 * The project summary card is the "README" of the workspace — it gives any
 * engineer who opens the project instant context about what it does and why.
 * Notion calls this the "Document Body", Linear shows it as the Issue Description,
 * GitHub renders it as the README.md. It's the most-read section of a project page.
 *
 * Tags (Infrastructure, High Priority, Internal) function like GitHub Labels or
 * Linear's Project Type — they provide scannable metadata at a glance.
 */
export default function ProjectSummary({ fullDescription, tags, tagStyles }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">Project Summary</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${tagStyles[tag]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {fullDescription}
      </p>
    </div>
  );
}
