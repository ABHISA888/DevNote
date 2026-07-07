/**
 * 🎓 TEACHING MOMENT: TechnologyStackCard.jsx
 *
 * WHY THIS EXISTS:
 * Technology badges communicate "what is this project built with?" instantly.
 * GitHub shows language breakdown as a colored bar, Stackshare shows badges,
 * Linear shows labels. For a developer workspace, tech stack is critical
 * metadata — it tells a new engineer which skills they need to contribute.
 */
export default function TechnologyStackCard({ stack }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Technology Stack
      </h3>

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.id}
            className={`rounded-md border px-2.5 py-1 text-xs font-bold ${tech.color}`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
