import { useState } from 'react';
import NotesSidebar from './NotesSidebar';
import NoteEditor from './NoteEditor';
import EmptyState from './EmptyState';
import { MOCK_NOTES } from '../../../mock/notes';

/**
 * 🎓 TEACHING MOMENT: NotesTab.jsx
 * 
 * WHY THIS EXISTS:
 * This acts as the container and state manager for the entire Notes module.
 * It holds the master list of notes and the ID of the currently active note.
 * 
 * BACKEND SYNC:
 * Functions like `handleUpdateNote`, `handleCreateNote`, and `handleDeleteNote` currently
 * update the React state array. In a production environment, these functions would be
 * wrapped with API calls (e.g., `axios.post()`) to synchronize with the database.
 */
export default function NotesTab() {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state: Filtered notes for sidebar
  const filteredNotes = notes.filter((note) =>
    (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeNote = notes.find((n) => n.id === activeNoteId);

  // Actions
  const handleNoteSelect = (note) => {
    setActiveNoteId(note.id);
  };

  const handleCreateNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: '',
      content: '',
      folder: 'Uncategorized',
      isPinned: false,
      lastEdited: 'Just now',
      wordCount: 0
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId));
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
  };

  const handleDuplicateNote = (noteToDuplicate) => {
    const duplicatedNote = {
      ...noteToDuplicate,
      id: `note-${Date.now()}`,
      title: `${noteToDuplicate.title} (Copy)`,
      lastEdited: 'Just now'
    };
    setNotes([duplicatedNote, ...notes]);
    setActiveNoteId(duplicatedNote.id);
  };

  return (
    <div className="flex h-[calc(100vh-130px)] w-full overflow-hidden border-t border-gray-200">
      {/* Left Sidebar */}
      <NotesSidebar
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        onNoteSelect={handleNoteSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateNote={handleCreateNote}
      />

      {/* Main Editor Area */}
      <div className="flex-1 overflow-hidden bg-white">
        {activeNote ? (
          <NoteEditor
            note={activeNote}
            onUpdateNote={handleUpdateNote}
            onDelete={handleDeleteNote}
            onDuplicate={handleDuplicateNote}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
