import { Download, Plus } from 'lucide-react';

export default function ProjectsHeader({ onNewProjectClick }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">My Projects</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage, organize, and track all your development projects in one place.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50">
          <Download size={14} /> Import Project
        </button>
        <button 
          onClick={onNewProjectClick}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
        >
          <Plus size={14} strokeWidth={2.5} /> New Project
        </button>
      </div>
    </div>
  );
}

