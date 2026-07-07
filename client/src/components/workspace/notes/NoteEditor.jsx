import { useState, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import MarkdownPreview from './MarkdownPreview';

/**
 * 🎓 TEACHING MOMENT: NoteEditor.jsx
 * 
 * WHY THIS EXISTS:
 * This is the main workhorse of the Notes module. It manages the active note's
 * local state and debounces changes before sending them to the parent (which would
 * normally send them to a backend API).
 * 
 * AUTOSAVE MECHANISM:
 * As the user types in the textarea, `localContent` updates instantly for a snappy UI.
 * A `setTimeout` is cleared and reset on every keystroke. If the user stops typing
 * for 1 second, the timeout fires, updating the parent state and setting `isSaving` to false.
 */
export default function NoteEditor({ note, onUpdateNote, onDelete, onDuplicate }) {
  const [localContent, setLocalContent] = useState(note.content || '');
  const [localTitle, setLocalTitle] = useState(note.title || '');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(note.wordCount || 0);
  
  const saveTimeoutRef = useRef(null);

  // Sync local state when the active note changes
  useEffect(() => {
    setLocalContent(note.content || '');
    setLocalTitle(note.title || '');
    setWordCount(note.wordCount || 0);
    setIsPreviewMode(false);
    setIsSaving(false);
  }, [note.id]);

  // Handle title changes
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    triggerAutosave(newTitle, localContent);
  };

  // Handle content changes
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    
    // Calculate word count
    const words = newContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);

    triggerAutosave(localTitle, newContent, words);
  };

  // Debounced Autosave
  const triggerAutosave = (title, content, words = wordCount) => {
    setIsSaving(true);
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      onUpdateNote({
        ...note,
        title,
        content,
        wordCount: words,
        lastEdited: 'Just now'
      });
      setIsSaving(false);
    }, 1000); // 1 second debounce
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <Toolbar 
        isPreviewMode={isPreviewMode} 
        onTogglePreview={setIsPreviewMode}
        isSaving={isSaving}
        wordCount={wordCount}
        onDelete={() => onDelete(note.id)}
        onDuplicate={() => onDuplicate(note)}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl w-full">
          {/* Title Input */}
          <div className="px-8 pt-10 pb-2">
            <input
              type="text"
              value={localTitle}
              onChange={handleTitleChange}
              placeholder="Untitled Note"
              className="w-full text-4xl font-extrabold text-slate-900 outline-none placeholder:text-slate-300 bg-transparent"
            />
          </div>

          {/* Editor / Preview Area */}
          {isPreviewMode ? (
            <MarkdownPreview content={localContent} />
          ) : (
            <textarea
              value={localContent}
              onChange={handleContentChange}
              placeholder="Start typing in markdown..."
              className="h-[calc(100vh-250px)] w-full resize-none bg-transparent px-8 py-6 text-slate-700 outline-none font-medium leading-relaxed"
            />
          )}
        </div>
      </div>
    </div>
  );
}
