import React from 'react';

/**
 * 🎓 TEACHING MOMENT: MarkdownPreview.jsx
 * 
 * WHY THIS EXISTS:
 * Provides a read-only formatted view of the raw markdown text. 
 * In a full production build, you would replace the parseMarkdown logic below with
 * an industry-standard parser like `react-markdown` or `marked`. 
 * Here we use a basic regex parser to fulfill the UI requirement without adding dependencies.
 */
export default function MarkdownPreview({ content }) {
  // A very basic markdown parser for demonstration purposes.
  // In a real app, use `react-markdown` to safely parse and sanitize.
  const parseMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mt-8 mb-3 border-b border-gray-100 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 mt-4 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-600 mb-1">$1</li>')
      .replace(/\n\n/gim, '<br/><br/>')
      .replace(/<br\/><br\/>(<h)/gim, '$1'); // cleanup spacing before headings

    return html;
  };

  return (
    <div 
      className="prose prose-slate max-w-none px-8 py-8 w-full outline-none text-slate-700 leading-relaxed font-medium"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}
