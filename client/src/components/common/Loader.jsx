import React from 'react';

/**
 * 🎓 TEACHING MOMENT: Reusable UI Spinner
 * 
 * This is a highly polished loading indicator using Tailwind utility classes.
 * - `animate-spin` creates a infinite rotation keyframe animation.
 * - `border-t-indigo-600` colors the spinner's rotating tip.
 */
export default function Loader() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full border-4 border-indigo-100/80"></div>
        <div className="absolute h-12 w-12 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
        Retrieving Workspace...
      </p>
    </div>
  );
}
