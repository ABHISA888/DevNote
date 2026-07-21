import { useState } from 'react';

/**
 * 🎓 TEACHING MOMENT: TaskProgressBar.jsx
 * Dynamic progress bar with inline edit capability (0-100%).
 */
export default function TaskProgressBar({ progress = 0, onUpdateProgress }) {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(progress);

  const numVal = Math.min(100, Math.max(0, Number(val) || 0));
  const isDone = numVal === 100;
  const barColor = isDone ? 'bg-emerald-500' : 'bg-primary-600';

  const handleBlurOrEnter = () => {
    setIsEditing(false);
    if (onUpdateProgress && numVal !== progress) {
      onUpdateProgress(numVal);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full min-w-[120px]">
      <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${numVal}%` }}
        />
      </div>

      {isEditing ? (
        <input
          type="number"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={handleBlurOrEnter}
          onKeyDown={(e) => e.key === 'Enter' && handleBlurOrEnter()}
          autoFocus
          className="w-12 h-6 text-center text-xs font-bold text-slate-700 rounded border border-primary-400 bg-white outline-none ring-2 ring-primary-100"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            if (onUpdateProgress) {
              setVal(progress);
              setIsEditing(true);
            }
          }}
          title={onUpdateProgress ? "Click to edit progress" : ""}
          className="shrink-0 text-[11px] font-bold text-slate-600 w-10 text-right hover:text-primary-600 transition"
        >
          {progress}%
        </button>
      )}
    </div>
  );
}
