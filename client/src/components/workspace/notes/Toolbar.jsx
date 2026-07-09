import { Eye, Edit2, Copy, Trash2, CheckCircle2, RefreshCcw } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: Toolbar.jsx
 * 
 * WHY THIS EXISTS:
 * This component hosts the actions related to the active note. 
 * We separate it from the editor to keep the textarea component clean.
 * It features a visual save indicator to reassure users that autosave is functioning.
 */
export default function Toolbar({ 
  isPreviewMode, 
  onTogglePreview, 
  isSaving, 
  wordCount,
  onDelete,
  onDuplicate
}) {
  return (
    <div className="flex flex-wrap items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
      {/* Left side actions (View Toggle) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-200 bg-slate-50 p-0.5">
          <button
            onClick={() => onTogglePreview(false)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              !isPreviewMode 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Edit2 size={13} /> Edit
          </button>
          <button
            onClick={() => onTogglePreview(true)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              isPreviewMode 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Eye size={13} /> Preview
          </button>
        </div>
      </div>

      {/* Right side stats and actions */}
      <div className="flex items-center gap-4">
        {/* Save indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          {isSaving ? (
            <>
              <RefreshCcw size={12} className="animate-spin text-primary-500" />
              <span className="text-primary-500">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={12} className="text-primary-500" />
              <span>Saved</span>
            </>
          )}
        </div>

        {/* Word count separator */}
        <div className="h-4 w-px bg-gray-200" />

        {/* Word count */}
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {wordCount} Words
        </span>

        {/* Word count separator */}
        <div className="h-4 w-px bg-gray-200" />

        {/* Note Actions */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onDuplicate}
            className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 transition"
            aria-label="Duplicate Note"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={onDelete}
            className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
            aria-label="Delete Note"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
