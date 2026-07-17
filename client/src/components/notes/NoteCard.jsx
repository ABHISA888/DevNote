import { Pin, Star } from 'lucide-react';

export default function NoteCard({ note, isActive, onClick }) {
  if (!note) return null;

  // Extract a short preview from content
  const preview = note.content
    ? note.content.replace(/[#*_~`\[\]]/g, '').substring(0, 80) + '...'
    : 'No content';

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border p-4 transition-all duration-150 hover:shadow-md ${
        isActive
          ? 'border-indigo-300 bg-indigo-50/50 shadow-sm'
          : 'border-gray-200 bg-white shadow-sm hover:border-indigo-200'
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className={`text-sm font-bold truncate ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
          {note.title || 'Untitled Note'}
        </h4>
        <div className="flex shrink-0 gap-1.5 text-slate-400">
          {note.isPinned && <Pin size={12} className={isActive ? 'text-indigo-600' : 'text-slate-500'} />}
          {note.isFavorite && <Star size={12} className={isActive ? 'text-amber-500' : 'text-amber-400'} />}
        </div>
      </div>
      
      <p className="mb-3 text-[11px] leading-relaxed text-slate-500 line-clamp-2">
        {preview}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400">
          {note.lastEdited}
        </span>
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1 overflow-hidden">
            <span className="truncate rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-extrabold text-slate-500">
              {note.tags[0]}
            </span>
            {note.tags.length > 1 && (
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-extrabold text-slate-500">
                +{note.tags.length - 1}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
