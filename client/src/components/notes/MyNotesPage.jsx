import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';

import NotesStats from './NotesStats';
import SearchBar from './SearchBar';
import NewNoteButton from './NewNoteButton';
import NotesSidebar from './NotesSidebar';
import NoteEditor from './NoteEditor';
import EmptyNotes from './EmptyNotes';
import DeleteNoteModal from './DeleteNoteModal';

import { MY_NOTES_DATA } from '../../constants/myNotesData';

export default function MyNotesPage() {
  const [notes, setNotes] = useState(MY_NOTES_DATA);
  const [activeNoteId, setActiveNoteId] = useState(MY_NOTES_DATA[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Derived state
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter(
      (n) =>
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.content && n.content.toLowerCase().includes(q))
    );
  }, [notes, searchQuery]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) || null,
    [notes, activeNoteId]
  );

  const stats = useMemo(() => {
    const total = notes.length;
    const pinned = notes.filter((n) => n.isPinned).length;
    const favorites = notes.filter((n) => n.isFavorite).length;
    return [
      { id: 'total', label: 'Total Notes', value: total, icon: 'FileText', colorClass: 'border-indigo-100 bg-indigo-50 text-indigo-600' },
      { id: 'pinned', label: 'Pinned', value: pinned, icon: 'Pin', colorClass: 'border-slate-100 bg-slate-50 text-slate-400' },
      { id: 'favorites', label: 'Favorites', value: favorites, icon: 'Star', colorClass: 'border-amber-100 bg-amber-50 text-amber-500' },
      { id: 'recent', label: 'Recently Edited', value: 'Today', icon: 'Clock', colorClass: 'border-slate-100 bg-slate-50 text-slate-400' },
    ];
  }, [notes]);

  // Handlers
  const handleSelectNote = (note) => {
    setActiveNoteId(note.id);
  };

  const handleCreateNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: '',
      content: '',
      lastEdited: 'Just now',
      isPinned: false,
      isFavorite: false,
      tags: [],
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setSearchQuery('');
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? { ...updatedNote, lastEdited: 'Just now' } : n))
    );
  };

  const handleTogglePin = () => {
    if (!activeNote) return;
    handleUpdateNote({ ...activeNote, isPinned: !activeNote.isPinned });
  };

  const handleToggleFavorite = () => {
    if (!activeNote) return;
    handleUpdateNote({ ...activeNote, isFavorite: !activeNote.isFavorite });
  };

  const handleDuplicate = () => {
    if (!activeNote) return;
    const duplicate = {
      ...activeNote,
      id: `note-${Date.now()}`,
      title: `${activeNote.title || 'Untitled'} (Copy)`,
      lastEdited: 'Just now',
    };
    setNotes([duplicate, ...notes]);
    setActiveNoteId(duplicate.id);
    toast.success('Note duplicated');
  };

  const handleDeleteRequest = () => {
    if (!activeNote) return;
    setNoteToDelete(activeNote);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!noteToDelete) return;
    setNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id));
    
    // Auto-select another note
    if (activeNoteId === noteToDelete.id) {
      const remaining = notes.filter((n) => n.id !== noteToDelete.id);
      setActiveNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
    
    setDeleteModalOpen(false);
    setNoteToDelete(null);
    toast.success('Note deleted');
  };

  return (
    <div className="mx-auto max-w-[1400px] w-full px-4 pt-6 pb-2 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">My Notes</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-400">
            Capture ideas, reminders and personal developer notes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <NewNoteButton onClick={handleCreateNote} />
        </div>
      </div>

      {/* Stats */}
      <div className="shrink-0">
        <NotesStats stats={stats} />
      </div>

      {/* Main Content Area - Fill remaining height */}
      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0 overflow-hidden pb-4">
        {/* Left Sidebar - Notes List */}
        <NotesSidebar
          notes={filteredNotes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
        />

        {/* Right Panel - Note Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeNote ? (
            <NoteEditor
              note={activeNote}
              onChange={handleUpdateNote}
              onDelete={handleDeleteRequest}
              onDuplicate={handleDuplicate}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <EmptyNotes onAdd={notes.length === 0 ? handleCreateNote : null} />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteNoteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
