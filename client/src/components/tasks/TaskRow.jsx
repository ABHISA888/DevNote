import PriorityBadge from './PriorityBadge';
import InlineStatusDropdown from './InlineStatusDropdown';
import AssignedUsers from './AssignedUsers';
import TaskProgressBar from './TaskProgressBar';
import TaskActionsMenu from './TaskActionsMenu';
import { CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TaskRow({
  id, name, priority, status, dueDate, progress,
  isSelected, assignees, additionalAssignees,
  isGlobal, projectName,
  onEdit, onDelete, onStatusChange,
}) {
  const navigate = useNavigate();

  const handleProjectClick = (e) => {
    e.stopPropagation();
    if (projectName) {
      const slug = projectName.toLowerCase().replace(/\s+/g, '-');
      navigate(`/projects/${slug}`);
    }
  };

  return (
    <tr className="group border-b border-gray-100 transition-colors hover:bg-primary-50/40">

      {/* ── Task Name ── */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 text-slate-300 transition group-hover:text-primary-400">
            {isSelected
              ? <CheckCircle2 size={18} className="text-primary-600 fill-primary-100" strokeWidth={2} />
              : <Circle size={18} strokeWidth={1.5} />
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{name}</p>
            <p className="mt-0.5 text-xs font-mono font-medium text-slate-400">{id}</p>
          </div>
        </div>
      </td>

      {/* ── Project (Global only) ── */}
      {isGlobal && (
        <td className="px-4 py-4">
          {projectName ? (
            <button
              onClick={handleProjectClick}
              className="inline-flex items-center text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              {projectName}
            </button>
          ) : (
            <span className="text-xs text-slate-400">—</span>
          )}
        </td>
      )}

      {/* ── Priority ── */}
      <td className="px-4 py-4">
        <PriorityBadge priority={priority} />
      </td>

      {/* ── Status (interactive) ── */}
      <td className="px-4 py-4">
        <InlineStatusDropdown status={status} onStatusChange={(s) => onStatusChange(id, s)} />
      </td>

      {/* ── Due Date ── */}
      <td className="px-4 py-4">
        <span className="text-xs font-semibold text-slate-600">{dueDate}</span>
      </td>

      {/* ── Assigned ── */}
      <td className="px-4 py-4">
        <AssignedUsers assignees={assignees} additionalAssignees={additionalAssignees} />
      </td>

      {/* ── Progress ── */}
      <td className="py-4 pl-4 pr-4">
        <TaskProgressBar progress={progress} />
      </td>

      {/* ── Actions ── */}
      <td className="py-4 pr-6 text-right">
        <TaskActionsMenu onEdit={() => onEdit(id)} onDelete={() => onDelete(id)} />
      </td>
    </tr>
  );
}
