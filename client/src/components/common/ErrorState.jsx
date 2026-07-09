import React from 'react';

/**
 * 🎓 TEACHING MOMENT: Reusable Error Interface
 * 
 * Designing UI for failure states is a crucial UX principle.
 * - `onRetry` prop allows users to kickstart the fetch operation again without refreshing the entire page.
 * - Standardized SVG error icon ensures it works independently of external Lucide icon imports.
 */
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/20 p-8 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 border border-red-100 text-red-500 shadow-sm animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-slate-800">Connection Failed</h3>
      <p className="mt-2 text-xs font-semibold text-slate-500 max-w-sm leading-relaxed">
        {message || 'We ran into an issue connecting to the database server.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 active:scale-95"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
