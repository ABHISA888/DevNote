import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Copy, Check, FileText, Loader2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { projectService } from '../../../services/api/projectService';
import toast from 'react-hot-toast';

// Helper to extract plain text string from react components for heading IDs
const getHeadingText = (children) => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'string') return child;
      if (child && child.props && child.props.children) {
        return getHeadingText(child.props.children);
      }
      return '';
    }).join('');
  }
  if (children && children.props && children.props.children) {
    return getHeadingText(children.props.children);
  }
  return '';
};

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

  // Extract navigation sections dynamically
  const sections = useMemo(() => {
    if (!readme) return [];
    
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const list = [];
    let match;
    
    while ((match = headingRegex.exec(readme)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      
      // Clean up markdown syntax from the title for display
      const cleanTitle = title
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1');
        
      const id = cleanTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      list.push({ id, title: cleanTitle, level });
    }
    
    if (list.length === 0) {
      list.push({ id: 'readme-top', title: 'Overview', level: 1 });
    }
    
    return list;
  }, [readme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    toast.success('README copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Heading renderer
  const HeadingRenderer = ({ level, children }) => {
    const text = getHeadingText(children);
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const Tag = `h${level}`;
    
    const classes = {
      1: 'text-2xl font-extrabold text-slate-800 border-b border-slate-200 pb-2.5 mt-8 mb-4',
      2: 'text-xl font-bold text-slate-800 mt-6 border-b border-slate-100 pb-2 mb-3.5',
      3: 'text-base font-bold text-slate-800 mt-5 mb-2',
      4: 'text-sm font-bold text-slate-800 mt-4 mb-2',
    }[level] || 'text-sm font-bold text-slate-800 mt-4 mb-2';

    return (
      <Tag id={id} className={classes}>
        {children}
      </Tag>
    );
  };

  // Code renderer
  const CodeRenderer = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const [copiedCode, setCopiedCode] = useState(false);
    const codeString = String(children).replace(/\n$/, '');

    const handleCopyCode = () => {
      navigator.clipboard.writeText(codeString);
      setCopiedCode(true);
      toast.success('Code block copied!');
      setTimeout(() => setCopiedCode(false), 2000);
    };

    if (inline) {
      return (
        <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200/60" {...props}>
          {children}
        </code>
      );
    }

    return (
      <div className="relative group my-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner">
        <div className="flex items-center justify-between bg-slate-950 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none border-b border-slate-800">
          <span>{match ? match[1] : 'code'}</span>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            {copiedCode ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
            {copiedCode ? 'Copied' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={match ? match[1] : 'text'}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: 'transparent',
            padding: '1rem',
            fontSize: '0.75rem',
            lineHeight: '1.25rem',
            overflowX: 'auto',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };

  // Custom components for react-markdown
  const markdownComponents = useMemo(() => ({
    h1: ({ children }) => <HeadingRenderer level={1}>{children}</HeadingRenderer>,
    h2: ({ children }) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
    h3: ({ children }) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
    h4: ({ children }) => <HeadingRenderer level={4}>{children}</HeadingRenderer>,
    code: CodeRenderer,
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">{children}</thead>,
    tbody: ({ children }) => <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-slate-50/50 transition">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 font-medium text-slate-600">{children}</td>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-indigo-500 bg-indigo-50/20 px-4 py-3 rounded-r-lg italic text-slate-600">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="my-6 max-w-full h-auto rounded-xl shadow-sm border border-slate-200/80 mx-auto block hover:shadow-md transition"
      />
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 space-y-1.5 my-4 text-sm text-slate-600">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 space-y-1.5 my-4 text-sm text-slate-600">{children}</ol>,
    li: ({ children, checked, ...props }) => {
      if (checked !== undefined && checked !== null) {
        return (
          <li className="flex items-start gap-2 text-sm text-slate-600 my-1 list-none">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>{children}</span>
          </li>
        );
      }
      return <li className="text-sm text-slate-600 my-1">{children}</li>;
    },
    p: ({ children }) => <p className="text-sm text-slate-600 leading-relaxed my-3">{children}</p>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline font-semibold"
      >
        {children}
      </a>
    )
  }), []);

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
        {/* Left column sidebar: Navigation (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Documentation Nav
            </h4>
            <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto pr-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`flex items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 ${
                    sec.level === 2 ? 'pl-5' : sec.level === 3 ? 'pl-8' : ''
                  }`}
                >
                  <BookOpen size={12} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">{sec.title}</span>
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
                  className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm"
                  title="Copy markdown content"
                >
                  {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Rendered content */}
            <div id="readme-top" className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {readme}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
