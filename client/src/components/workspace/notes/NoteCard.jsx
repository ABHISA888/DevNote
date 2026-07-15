import { FileText, Pin } from 'lucide-react';

export default function NoteCard({ note, isActive, onClick }) {
  const id = note._id || note.id;

  // Extract a brief text preview from markdown content
  const contentStr = note.content || '';
  const previewText = contentStr
    ? contentStr.replace(/[#*_\-`\[\]]/g, '').substring(0, 60) + (contentStr.length > 60 ? '...' : '')
    : 'Empty note...';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    const date = new Date(dateStr);
    const diffMs = new Date() - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <button
      onClick={() => onClick(note)}
      className={`w-full flex flex-col text-left p-3 rounded-xl transition-all border ${
        isActive 
          ? 'bg-primary-50 border-primary-200 shadow-sm' 
          : 'bg-transparent border-transparent hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between mb-1 w-full">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <FileText size={14} className={isActive ? 'text-primary-600' : 'text-slate-400'} />
          <span className={`text-xs font-bold truncate flex-1 ${isActive ? 'text-primary-900' : 'text-slate-700'}`}>
            {note.title || 'Untitled Note'}
          </span>
        </div>
        {note.isPinned && (
          <Pin size={10} className="text-primary-500 shrink-0 ml-1.5 fill-primary-500" />
        )}
      </div>
      
      <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed ml-5">
        {previewText}
      </p>

      <div className="flex items-center justify-between mt-2.5 ml-5 w-[calc(100%-20px)]">
        <span className="text-[9px] font-semibold text-slate-400">
          {formatDate(note.updatedAt || note.createdAt)}
        </span>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1 overflow-hidden max-w-[60%]">
            {note.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[8px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider truncate">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
