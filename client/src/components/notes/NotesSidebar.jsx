import NoteCard from './NoteCard';

export default function NotesSidebar({ notes, activeNoteId, onSelectNote }) {
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const otherNotes = notes.filter((n) => !n.isPinned);

  if (notes.length === 0) {
    return (
      <div className="w-full lg:w-[300px] shrink-0 border-r border-gray-100 bg-white p-4">
        <p className="text-center text-xs font-medium text-slate-400 mt-8">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:w-[380px] shrink-0 border-r border-gray-100 bg-slate-50/30 p-4 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
      {pinnedNotes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="px-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Pinned
          </h3>
          <div className="flex flex-col gap-2">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={activeNoteId === note.id}
                onClick={() => onSelectNote(note)}
              />
            ))}
          </div>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="px-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Notes
          </h3>
          <div className="flex flex-col gap-2">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={activeNoteId === note.id}
                onClick={() => onSelectNote(note)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
