import { FileText } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: NoteCard.jsx
 * 
 * WHY THIS EXISTS:
 * Represents a single note entry in the sidebar list.
 * Highlights visually when selected to indicate active context.
 */
export default function NoteCard({ note, isActive, onClick }) {
  // Extract a brief text preview from markdown content
  const previewText = note.content
    .replace(/[#*_-]/g, '') // strip basic markdown
    .substring(0, 60) + '...';

  return (
    <button
      onClick={() => onClick(note)}
      className={`w-full flex flex-col text-left p-3 rounded-xl transition-all border ${
        isActive 
          ? 'bg-primary-50 border-primary-200 shadow-sm' 
          : 'bg-transparent border-transparent hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <FileText size={14} className={isActive ? 'text-primary-600' : 'text-slate-400'} />
          <span className={`text-xs font-bold truncate ${isActive ? 'text-primary-900' : 'text-slate-700'}`}>
            {note.title || 'Untitled Note'}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed ml-5">
        {previewText}
      </p>
      <div className="flex items-center justify-between mt-2 ml-5">
        <span className="text-[9px] font-semibold text-slate-400">{note.lastEdited}</span>
        {note.folder && (
          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 rounded uppercase tracking-widest">
            {note.folder}
          </span>
        )}
      </div>
    </button>
  );
}
