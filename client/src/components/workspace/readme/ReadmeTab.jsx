import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Copy, Check, FileText, Loader2, RefreshCw } from 'lucide-react';
import { projectService } from '../../../services/api/projectService';
import toast from 'react-hot-toast';

function parseMarkdown(md) {
  if (!md) return '';
  
  // HTML escapes
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Code blocks: ```lang ... ```
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const lines = code.trim().split('\n');
    const firstLine = lines[0].trim();
    const isLang = !firstLine.includes(' ') && firstLine.length < 15;
    const lang = isLang ? firstLine : '';
    const cleanCode = isLang ? lines.slice(1).join('\n') : code;
    return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 shadow-inner relative group border border-slate-800">
<div class="absolute right-3 top-2.5 text-[9px] uppercase font-bold text-slate-500 select-none">${lang}</div>
<code>${cleanCode}</code>
</pre>`;
  });

  // Inline code: `code`
  html = html.replace(/`([^`\n]+)`/g, '<code class="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200/60">$1</code>');

  // Headers: # Header
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-800 border-b border-slate-100 pb-2 mt-6 mb-4">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mt-5 border-b border-slate-100/50 pb-1.5 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-800 mt-4 mb-2">$1</h3>');

  // Bold: **text**
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong class="font-bold text-slate-800">$1</strong>');
  
  // Italics: *text*
  html = html.replace(/\*([^\*]+)\*/g, '<em class="italic">$1</em>');

  // Lists
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="list-disc ml-5 text-sm text-slate-600 my-1">$1</li>');
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="list-decimal ml-5 text-sm text-slate-600 my-1">$1</li>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline font-semibold">$1</a>');

  // Paragraphs (lines that don't start with tags)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<pre') || trimmed.startsWith('</pre') || trimmed.startsWith('<code') || trimmed.startsWith('</code')) {
      return line;
    }
    return `<p class="text-sm text-slate-600 leading-relaxed my-3">${line}</p>`;
  });
  
  return processedLines.join('\n');
}

export default function ReadmeTab({ project }) {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchReadmeData = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjectReadme(project._id || project.id);
      if (res.success) {
        setReadme(res.readme || '');
      }
    } catch (err) {
      console.error('Error fetching readme:', err);
      toast.error('Failed to load README content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      fetchReadmeData();
    }
  }, [project]);

  const renderedHtml = useMemo(() => parseMarkdown(readme), [readme]);

  // Extract navigation sections dynamically
  const sections = useMemo(() => {
    if (!readme) return [];
    
    const lines = readme.split('\n');
    const list = [{ id: 'overview', title: 'Overview' }];
    
    lines.forEach((line) => {
      const match = line.match(/^(##+)\s*(.*)$/);
      if (match) {
        const title = match[2].trim();
        const cleanTitle = title.replace(/[^\w\s-]/g, '');
        const id = cleanTitle.toLowerCase().replace(/\s+/g, '-');
        
        const lower = title.toLowerCase();
        if (
          lower.includes('install') || 
          lower.includes('usage') || 
          lower.includes('feature') || 
          lower.includes('start') || 
          lower.includes('config')
        ) {
          list.push({ id, title });
        }
      }
    });
    
    return list;
  }, [readme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    toast.success('README copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading README documentation...
        </p>
      </div>
    );
  }

  if (!readme) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <FileText size={24} />
        </div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          No README Available
        </h3>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          This project doesn't have a README imported yet. Make sure your project is linked to a valid GitHub repository with a README.md file.
        </p>
        <button
          onClick={fetchReadmeData}
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw size={12} /> Sync Repository
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left column sidebar: Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Documentation Nav
            </h4>
            <div className="flex flex-col gap-1.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                >
                  <BookOpen size={12} className="text-slate-400" />
                  {sec.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Document Viewer */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header Actions */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="text-indigo-600" size={18} />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  README.md
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition"
                  title="Copy markdown content"
                >
                  {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Rendered content */}
            <div id="overview" className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
