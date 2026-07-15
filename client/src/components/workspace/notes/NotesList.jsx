import NoteCard from './NoteCard';
import { Pin, Clock, Archive } from 'lucide-react';

export default function NotesList({ notes = [], activeNoteId, onNoteSelect }) {
  const pinnedNotes = notes.filter(n => n.isPinned && !n.isArchived);
  const recentNotes = notes.filter(n => !n.isPinned && !n.isArchived);
  const archivedNotes = notes.filter(n => n.isArchived);

  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="text-center py-10 px-4 text-slate-400">
        <p className="text-xs font-semibold">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-6 pr-1.5 custom-scrollbar">
      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2">
            <Pin size={12} className="text-primary-500 fill-primary-500" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Pinned</h4>
            <span className="text-[9px] font-bold text-slate-300 bg-slate-50 px-1.5 rounded-full">{pinnedNotes.length}</span>
          </div>
          <div className="space-y-1">
            {pinnedNotes.map((note) => (
              <NoteCard 
                key={note._id || note.id} 
                note={note} 
                isActive={(note._id || note.id) === activeNoteId} 
                onClick={onNoteSelect} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Section */}
      {recentNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2">
            <Clock size={12} className="text-slate-400" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Recent</h4>
            <span className="text-[9px] font-bold text-slate-300 bg-slate-50 px-1.5 rounded-full">{recentNotes.length}</span>
          </div>
          <div className="space-y-1">
            {recentNotes.map((note) => (
              <NoteCard 
                key={note._id || note.id} 
                note={note} 
                isActive={(note._id || note.id) === activeNoteId} 
                onClick={onNoteSelect} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Archived Section */}
      {archivedNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2">
            <Archive size={12} className="text-slate-400" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Archived</h4>
            <span className="text-[9px] font-bold text-slate-300 bg-slate-50 px-1.5 rounded-full">{archivedNotes.length}</span>
          </div>
          <div className="space-y-1">
            {archivedNotes.map((note) => (
              <NoteCard 
                key={note._id || note.id} 
                note={note} 
                isActive={(note._id || note.id) === activeNoteId} 
                onClick={onNoteSelect} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
