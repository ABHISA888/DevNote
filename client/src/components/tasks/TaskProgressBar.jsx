/**
 * 🎓 TEACHING MOMENT: ProgressBar.jsx (Tasks version)
 *
 * WHY THIS EXISTS:
 * Even though we have a ProgressBar in /projects, we keep this separate because
 * the Tasks design uses a different height, color, and layout pattern (percentage
 * text to the right). Reusing the projects one would force us to override too much.
 *
 * This is the "Rule of Three" in component design — only merge if 3+ places need
 * the exact same thing. Different visual contexts stay separate.
 */
export default function TaskProgressBar({ progress }) {
  const isDone = progress === 100;
  const barColor = isDone ? 'bg-emerald-500' : 'bg-indigo-600';

  return (
    <div className="flex items-center gap-3 w-full min-w-[120px]">
      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="shrink-0 text-[11px] font-bold text-slate-500 w-8 text-right">
        {progress}%
      </span>
    </div>
  );
}
