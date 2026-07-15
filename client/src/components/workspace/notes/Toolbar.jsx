import { Eye, Edit2, Columns, Copy, Trash2, CheckCircle2, RefreshCcw, Pin, Archive } from 'lucide-react';

export default function Toolbar({ 
  viewMode, 
  onViewModeChange, 
  isSaving, 
  wordCount,
  onDelete,
  onDuplicate,
  isPinned,
  onTogglePin,
  isArchived,
  onToggleArchive
}) {
  return (
    <div className="flex flex-wrap items-center justify-between border-b border-gray-150 bg-white px-6 py-3 select-none">
      {/* Left side actions (View Toggle) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-gray-200 bg-slate-50 p-0.5">
          <button
            onClick={() => onViewModeChange('write')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              viewMode === 'write' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Edit mode"
          >
            <Edit2 size={13} /> Write
          </button>
          <button
            onClick={() => onViewModeChange('preview')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              viewMode === 'preview' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Preview mode"
          >
            <Eye size={13} /> Preview
          </button>
          <button
            onClick={() => onViewModeChange('split')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              viewMode === 'split' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Split view"
          >
            <Columns size={13} /> Split
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
              <CheckCircle2 size={12} className="text-emerald-500" />
              <span className="text-emerald-600">Saved just now</span>
            </>
          )}
        </div>

        {/* Word count separator */}
        <div className="h-4 w-px bg-gray-200" />

        {/* Word count */}
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {wordCount} Words
        </span>

        {/* Action separator */}
        <div className="h-4 w-px bg-gray-200" />

        {/* Note Actions */}
        <div className="flex items-center gap-1">
          {/* Pin action */}
          <button 
            onClick={onTogglePin}
            className={`rounded p-1.5 transition ${
              isPinned 
                ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                : 'text-slate-400 hover:bg-slate-100 hover:text-primary-600'
            }`}
            aria-label={isPinned ? 'Unpin Note' : 'Pin Note'}
            title={isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin size={14} className={isPinned ? 'fill-primary-600' : ''} />
          </button>

          {/* Archive action */}
          <button 
            onClick={onToggleArchive}
            className={`rounded p-1.5 transition ${
              isArchived 
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' 
                : 'text-slate-400 hover:bg-slate-100 hover:text-amber-600'
            }`}
            aria-label={isArchived ? 'Unarchive Note' : 'Archive Note'}
            title={isArchived ? 'Unarchive' : 'Archive'}
          >
            <Archive size={14} className={isArchived ? 'fill-amber-600' : ''} />
          </button>

          {/* Duplicate action */}
          <button 
            onClick={onDuplicate}
            className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 transition"
            aria-label="Duplicate Note"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>

          {/* Delete action */}
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
