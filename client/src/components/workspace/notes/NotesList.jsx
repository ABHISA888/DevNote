import NoteCard from './NoteCard';
import { Pin, Clock } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: NotesList.jsx
 * 
 * WHY THIS EXISTS:
 * Separates notes into logical groupings (Pinned vs Recent) based on their properties.
 */
export default function NotesList({ notes, activeNoteId, onNoteSelect }) {
  const pinnedNotes = notes.filter(n => n.isPinned);
  const recentNotes = notes.filter(n => !n.isPinned);

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 px-4 text-slate-400">
        <p className="text-xs font-semibold">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-6">
      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2">
            <Pin size={12} className="text-slate-400" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Pinned</h4>
          </div>
          <div className="space-y-1">
            {pinnedNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                isActive={note.id === activeNoteId} 
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
          </div>
          <div className="space-y-1">
            {recentNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                isActive={note.id === activeNoteId} 
                onClick={onNoteSelect} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
