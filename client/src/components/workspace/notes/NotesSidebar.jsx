import { Plus } from 'lucide-react';
import SearchBar from './SearchBar';
import NotesList from './NotesList';

/**
 * 🎓 TEACHING MOMENT: NotesSidebar.jsx
 * 
 * WHY THIS EXISTS:
 * The left sidebar gives users persistent context of their workspace directory
 * without obstructing the main editor view.
 */
export default function NotesSidebar({ 
  notes, 
  activeNoteId, 
  onNoteSelect, 
  searchQuery, 
  onSearchChange,
  onCreateNote 
}) {
  return (
    <div className="flex w-full md:w-80 shrink-0 flex-col border-r border-gray-200 bg-white p-4 h-[calc(100vh-130px)]">
      {/* Sidebar Header & Action */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Project Notes</h3>
        <button 
          onClick={onCreateNote}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
          aria-label="Create New Note"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      
      <NotesList 
        notes={notes} 
        activeNoteId={activeNoteId} 
        onNoteSelect={onNoteSelect} 
      />
    </div>
  );
}
