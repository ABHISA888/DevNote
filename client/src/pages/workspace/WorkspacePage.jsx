import { useParams } from 'react-router-dom';

export default function WorkspacePage() {
  const { workspaceId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Workspace: <span className="text-indigo-400">{workspaceId || 'Default'}</span>
        </h1>
        <p className="text-slate-400">
          Manage code repositories, documentation, and active environment integrations.
        </p>
      </div>

      <div className="p-8 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Active Board</h2>
        <div className="h-48 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-sm">
          Workspace Kanban board placeholder for {workspaceId || 'Default Workspace'}
        </div>
      </div>
    </div>
  );
}
