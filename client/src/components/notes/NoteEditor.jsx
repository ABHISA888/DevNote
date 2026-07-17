import { useState, useEffect } from 'react';
import { MoreHorizontal, Pin, Star, Trash2, Copy, Pencil } from 'lucide-react';

export default function NoteEditor({ note, onChange, onDelete, onDuplicate, onTogglePin, onToggleFavorite }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags((note.tags || []).join(', '));
    }
  }, [note?.id]); // Only update when note ID changes

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onChange({ ...note, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onChange({ ...note, content: e.target.value });
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
    const tagArray = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
    onChange({ ...note, tags: tagArray });
  };

  if (!note) return null;

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden h-full">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400">
            Last edited {note.lastEdited}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePin}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                note.isPinned ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
              }`}
              title={note.isPinned ? 'Unpin' : 'Pin'}
            >
              <Pin size={14} />
            </button>
            <button
              onClick={onToggleFavorite}
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                note.isFavorite ? 'bg-amber-50 text-amber-500' : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
              }`}
              title={note.isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              <Star size={14} />
            </button>
          </div>
        </div>

        {/* Three dot menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <MoreHorizontal size={15} />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                <button
                  onClick={() => { onDuplicate(); setIsMenuOpen(false); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  <Copy size={13} className="text-slate-400" /> Duplicate
                </button>
                <div className="h-px bg-gray-100 mx-2" />
                <button
                  onClick={() => { onDelete(); setIsMenuOpen(false); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 flex-col p-6 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title..."
          className="mb-4 text-2xl font-black text-slate-800 placeholder-slate-300 outline-none w-full bg-transparent"
          autoFocus={!title} // Focus if new note
        />

        <div className="mb-4 flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Tags:</span>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="e.g. React, Interview (comma separated)"
            className="flex-1 text-xs font-semibold text-slate-600 outline-none placeholder-slate-300 bg-transparent"
          />
        </div>

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="flex-1 w-full resize-none text-sm leading-relaxed text-slate-600 placeholder-slate-300 outline-none bg-transparent font-mono"
        />
      </div>
    </div>
  );
}
