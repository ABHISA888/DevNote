import { useState, useEffect } from 'react';
import NotesSidebar from './NotesSidebar';
import NoteEditor from './NoteEditor';
import EmptyState from './EmptyState';
import { noteService } from '../../../services/api/noteService';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotesTab({ project }) {
  const projectId = project?._id || project?.id;

  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch notes on load and when project changes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        const res = await noteService.getNotes(projectId);
        if (res.success) {
          setNotes(res.data || []);
          if (res.data && res.data.length > 0) {
            setActiveNoteId(res.data[0]._id || res.data[0].id);
          } else {
            setActiveNoteId(null);
          }
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
        toast.error('Failed to load project notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [projectId]);

  // Derived state: Filtered notes for sidebar
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = note.title && note.title.toLowerCase().includes(query);
    const contentMatch = note.content && note.content.toLowerCase().includes(query);
    const tagsMatch = note.tags && note.tags.some(tag => tag.toLowerCase().includes(query));
    return titleMatch || contentMatch || tagsMatch;
  });

  const activeNote = notes.find((n) => (n._id || n.id) === activeNoteId);

  // Actions
  const handleNoteSelect = (note) => {
    setActiveNoteId(note._id || note.id);
  };

  const handleCreateNote = async () => {
    try {
      const newNotePayload = {
        title: 'Untitled Note',
        content: '',
        tags: []
      };
      const res = await noteService.createNote(projectId, newNotePayload);
      if (res.success && res.data) {
        setNotes([res.data, ...notes]);
        setActiveNoteId(res.data._id || res.data.id);
        toast.success('Note created');
      }
    } catch (err) {
      console.error('Error creating note:', err);
      toast.error('Failed to create note.');
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    const id = updatedNote._id || updatedNote.id;
    try {
      // Sync local state immediately for responsiveness
      setNotes((prevNotes) =>
        prevNotes.map((n) => ((n._id || n.id) === id ? updatedNote : n))
      );
      
      const payload = {
        title: updatedNote.title,
        content: updatedNote.content,
        tags: updatedNote.tags,
        isPinned: updatedNote.isPinned,
        isArchived: updatedNote.isArchived
      };

      await noteService.updateNote(projectId, id, payload);
    } catch (err) {
      console.error('Error updating note:', err);
      // Optional: revert local state or show silent error
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await noteService.deleteNote(projectId, noteId);
      if (res.success) {
        setNotes((prevNotes) => prevNotes.filter((n) => (n._id || n.id) !== noteId));
        if (activeNoteId === noteId) {
          setActiveNoteId(null);
        }
        toast.success('Note deleted');
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      toast.error('Failed to delete note.');
    }
  };

  const handleDuplicateNote = async (noteToDuplicate) => {
    try {
      const duplicatedPayload = {
        title: `${noteToDuplicate.title} (Copy)`,
        content: noteToDuplicate.content || '',
        tags: noteToDuplicate.tags || [],
        isPinned: noteToDuplicate.isPinned
      };
      const res = await noteService.createNote(projectId, duplicatedPayload);
      if (res.success && res.data) {
        setNotes([res.data, ...notes]);
        setActiveNoteId(res.data._id || res.data.id);
        toast.success('Note duplicated');
      }
    } catch (err) {
      console.error('Error duplicating note:', err);
      toast.error('Failed to duplicate note.');
    }
  };

  const handleTogglePin = async (noteToPin) => {
    const id = noteToPin._id || noteToPin.id;
    const newPinState = !noteToPin.isPinned;
    try {
      const updatedNote = { ...noteToPin, isPinned: newPinState };
      
      // Update local state first
      setNotes((prevNotes) =>
        prevNotes.map((n) => ((n._id || n.id) === id ? updatedNote : n))
      );
      
      await noteService.updateNote(projectId, id, { isPinned: newPinState });
      toast.success(newPinState ? 'Note pinned' : 'Note unpinned');
    } catch (err) {
      console.error('Error pinning note:', err);
      toast.error('Failed to toggle pin.');
    }
  };

  const handleToggleArchive = async (noteToArchive) => {
    const id = noteToArchive._id || noteToArchive.id;
    const newArchiveState = !noteToArchive.isArchived;
    try {
      const updatedNote = { ...noteToArchive, isArchived: newArchiveState };
      
      // Update local state first
      setNotes((prevNotes) =>
        prevNotes.map((n) => ((n._id || n.id) === id ? updatedNote : n))
      );

      await noteService.updateNote(projectId, id, { isArchived: newArchiveState });
      toast.success(newArchiveState ? 'Note archived' : 'Note unarchived');
    } catch (err) {
      console.error('Error archiving note:', err);
      toast.error('Failed to toggle archive.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-130px)] w-full items-center justify-center bg-white border-t border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-sm font-semibold text-slate-500">Loading project notes...</p>
        </div>
      </div>
    );
  }

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
            key={activeNote._id || activeNote.id}
            note={activeNote}
            onUpdateNote={handleUpdateNote}
            onDelete={handleDeleteNote}
            onDuplicate={handleDuplicateNote}
            onTogglePin={handleTogglePin}
            onToggleArchive={handleToggleArchive}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
