import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeRenderer = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopiedCode(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  if (inline) {
    return (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-800" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-slate-850 bg-slate-900 shadow-inner">
      <div className="flex items-center justify-between bg-slate-950 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none border-b border-slate-850">
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
          padding: '1.25rem',
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

export default function MarkdownPreview({ content }) {
  const markdownComponents = useMemo(() => ({
    h1: ({ children }) => <h1 className="text-2xl font-extrabold text-slate-900 mt-6 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold text-slate-800 mt-5 mb-3 border-b border-gray-100 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-bold text-slate-800 mt-3 mb-1.5">{children}</h4>,
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
              className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 pointer-events-none"
            />
            <span>{children}</span>
          </li>
        );
      }
      return <li {...props}>{children}</li>;
    }
  }), []);

  return (
    <div className="prose prose-slate max-w-none px-8 py-8 w-full outline-none text-slate-700 leading-relaxed font-medium">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content || '*No content yet. Start writing in Markdown.*'}
      </ReactMarkdown>
    </div>
  );
}
