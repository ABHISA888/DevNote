import { useState } from 'react';
import { WORKSPACE_TABS } from '../../constants/workspaceData';

/**
 * 🎓 TEACHING MOMENT: WorkspaceTabs.jsx
 *
 * WHY THIS EXISTS:
 * The tab bar is the primary navigation within a project workspace.
 * GitHub uses tabs (Code, Issues, Pull Requests, Actions...).
 * Linear uses tabs inside an issue (Comments, Activity, Sub-issues).
 * Notion uses them as database views (Table, Board, Calendar...).
 *
 * CURRENT PATTERN — Local State:
 * Tab state is kept locally with useState. The active tab highlights the
 * correct button. When the backend tabs are built, we'll swap to:
 *   const { projectId } = useParams();
 *   navigate(`/project/${projectId}/${tab.path}`);
 *
 * The `onTabChange` prop is the bridge — parent passes a handler now so
 * the migration will be a 1-line change here.
 */
export default function WorkspaceTabs({ activeTab, onTabChange }) {
  return (
    <nav className="mt-5 border-b border-gray-200 px-4 sm:px-6">
      <div className="flex overflow-x-auto scrollbar-hide -mb-px gap-1">
        {WORKSPACE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-xs font-bold transition-colors ${
                isActive
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
