import { useState, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import MarkdownPreview from './MarkdownPreview';
import { 
  Heading, Bold, Italic, Underline, List, ListOrdered, ListTodo, Code, Quote, Plus, X 
} from 'lucide-react';

export default function NoteEditor({ note, onUpdateNote, onDelete, onDuplicate, onTogglePin, onToggleArchive }) {
  const noteId = note._id || note.id;

  const [localContent, setLocalContent] = useState(note.content || '');
  const [localTitle, setLocalTitle] = useState(note.title || '');
  const [localTags, setLocalTags] = useState(note.tags || []);
  const [viewMode, setViewMode] = useState('write'); // 'write' | 'preview' | 'split'
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(note.wordCount || 0);
  const [tagInput, setTagInput] = useState('');
  
  const saveTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  // Sync local state when the active note changes
  useEffect(() => {
    setLocalContent(note.content || '');
    setLocalTitle(note.title || '');
    setLocalTags(note.tags || []);
    setWordCount(note.content ? note.content.trim().split(/\s+/).filter(Boolean).length : 0);
    setViewMode('write');
    setIsSaving(false);
  }, [noteId]);

  // Handle title changes
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    triggerAutosave(newTitle, localContent, localTags);
  };

  // Handle content changes
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    
    // Calculate word count
    const words = newContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);

    triggerAutosave(localTitle, newContent, localTags, words);
  };

  // Debounced Autosave
  const triggerAutosave = (title, content, tags = localTags, words = wordCount) => {
    setIsSaving(true);
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      onUpdateNote({
        ...note,
        title,
        content,
        tags,
        wordCount: words
      });
      setIsSaving(false);
    }, 1500); // 1.5 seconds debounce
  };

  // Markdown formatting insertions
  const insertMarkdown = (syntaxType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = '';
    switch (syntaxType) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        replacement = `<u>${selectedText || 'underlined text'}</u>`;
        break;
      case 'heading':
        replacement = `\n### ${selectedText || 'Heading'}\n`;
        break;
      case 'bullet':
        replacement = `\n- ${selectedText || 'List item'}`;
        break;
      case 'number':
        replacement = `\n1. ${selectedText || 'List item'}`;
        break;
      case 'check':
        replacement = `\n- [ ] ${selectedText || 'Task'}`;
        break;
      case 'code':
        replacement = `\n\`\`\`javascript\n${selectedText || '// code here'}\n\`\`\`\n`;
        break;
      case 'quote':
        replacement = `\n> ${selectedText || 'Quote'}\n`;
        break;
      default:
        return;
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setLocalContent(newContent);
    
    // Calculate word count
    const words = newContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);

    // Focus back and select inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);

    triggerAutosave(localTitle, newContent, localTags, words);
  };

  // Tags Actions
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (newTag && !localTags.includes(newTag)) {
        const updatedTags = [...localTags, newTag];
        setLocalTags(updatedTags);
        triggerAutosave(localTitle, localContent, updatedTags);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = localTags.filter(t => t !== tagToRemove);
    setLocalTags(updatedTags);
    triggerAutosave(localTitle, localContent, updatedTags);
  };

  const formattingButtons = [
    { type: 'heading', icon: Heading, label: 'Heading' },
    { type: 'bold', icon: Bold, label: 'Bold' },
    { type: 'italic', icon: Italic, label: 'Italic' },
    { type: 'underline', icon: Underline, label: 'Underline' },
    { type: 'bullet', icon: List, label: 'Bullet List' },
    { type: 'number', icon: ListOrdered, label: 'Numbered List' },
    { type: 'check', icon: ListTodo, label: 'Checklist' },
    { type: 'code', icon: Code, label: 'Code Block' },
    { type: 'quote', icon: Quote, label: 'Quote' }
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <Toolbar 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        isSaving={isSaving}
        wordCount={wordCount}
        onDelete={() => onDelete(noteId)}
        onDuplicate={() => onDuplicate(note)}
        isPinned={note.isPinned}
        onTogglePin={() => onTogglePin(note)}
        isArchived={note.isArchived}
        onToggleArchive={() => onToggleArchive(note)}
      />

      {/* Editor & Preview Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header Metadata Section (Title & Tags) */}
        <div className="px-8 pt-8 pb-4 border-b border-slate-50 shrink-0">
          <input
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="Untitled Note"
            className="w-full text-3xl font-extrabold text-slate-900 outline-none placeholder:text-slate-200 bg-transparent mb-4"
          />

          {/* Tags Editor */}
          <div className="flex flex-wrap items-center gap-2">
            {localTags.map((tag) => (
              <span 
                key={tag} 
                className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-0.5 uppercase tracking-wide"
              >
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 hover:bg-indigo-100/50 rounded-full p-0.5 transition"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <div className="relative flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag..."
                className="text-[10px] font-bold text-slate-500 placeholder:text-slate-300 outline-none border border-dashed border-slate-200 hover:border-slate-300 focus:border-indigo-400 rounded-lg px-2 py-0.5 uppercase bg-transparent transition w-24"
              />
            </div>
          </div>
        </div>

        {/* View Mode Split/Write/Preview panels */}
        <div className="flex-1 overflow-hidden flex">
          {/* Write Panel */}
          {(viewMode === 'write' || viewMode === 'split') && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Markdown Formatting Toolbar helper */}
              <div className="flex items-center gap-1 px-8 py-2 border-b border-slate-50 bg-slate-50/30 shrink-0 select-none">
                {formattingButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.type}
                      onClick={() => insertMarkdown(btn.type)}
                      className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                      title={btn.label}
                    >
                      <Icon size={14} />
                    </button>
                  );
                })}
              </div>
              <textarea
                ref={textareaRef}
                value={localContent}
                onChange={handleContentChange}
                placeholder="Start writing in markdown..."
                className="flex-1 w-full resize-none bg-transparent px-8 py-6 text-slate-700 outline-none font-medium leading-relaxed overflow-y-auto"
              />
            </div>
          )}

          {/* Split separator line */}
          {viewMode === 'split' && (
            <div className="w-px bg-slate-150 shrink-0" />
          )}

          {/* Preview Panel */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="flex-1 overflow-y-auto bg-slate-50/20">
              <MarkdownPreview content={localContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
