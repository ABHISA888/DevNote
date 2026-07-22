import PriorityBadge from './PriorityBadge';
import InlineStatusDropdown from './InlineStatusDropdown';
import AssignedUsers from './AssignedUsers';
import TaskProgressBar from './TaskProgressBar';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskRow.jsx
 * Represents a single database task row connected to real MongoDB data & API actions.
 */
export default function TaskRow({ task, onEdit, onDelete, onUpdateProgress, onStatusChange }) {
  const taskId = task._id || task.id;
  const title = task.title || task.name || 'Untitled Task';
  const projectName = task.project?.name || task.projectName || 'General';
  const priority = task.priority || 'Medium';
  const status = task.status || 'Todo';
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No due date';

  const progressVal = typeof task.progress === 'number' ? task.progress : (status === 'Completed' ? 100 : 0);

  return (
    <tr className="group border-b border-gray-100 transition-colors hover:bg-primary-50/30">
      
      {/* 1. Task Name */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 text-slate-400">
            {status === 'Completed' ? (
              <CheckCircle2 size={18} className="text-emerald-500 fill-emerald-50" />
            ) : (
              <Circle size={18} strokeWidth={1.5} />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{title}</p>
            {task.description && (
              <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{task.description}</p>
            )}
          </div>
        </div>
      </td>

      {/* 2. Project */}
      <td className="px-4 py-4">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {projectName}
        </span>
      </td>

      {/* 3. Priority */}
      <td className="px-4 py-4">
        <PriorityBadge priority={priority} />
      </td>

      {/* 4. Status */}
      <td className="px-4 py-4">
        <InlineStatusDropdown
          status={status}
          onStatusChange={(s) => onStatusChange ? onStatusChange(taskId, s) : (onUpdateProgress && s === 'Completed' ? onUpdateProgress(taskId, 100) : null)}
        />
      </td>

      {/* 5. Due Date */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Calendar size={13} className="text-slate-400 shrink-0" />
          <span>{formattedDueDate}</span>
        </div>
      </td>

      {/* 6. Assigned User */}
      <td className="px-4 py-4">
        <AssignedUsers
          githubUsername={task.githubUsername}
          githubAvatar={task.githubAvatar}
          githubProfile={task.githubProfile}
          assignees={task.assignedTo ? [task.assignedTo] : []}
        />
      </td>

      {/* 7. Progress */}
      <td className="px-4 py-4 w-[16%]">
        <TaskProgressBar
          progress={progressVal}
          onUpdateProgress={(newProg) => onUpdateProgress && onUpdateProgress(taskId, newProg)}
        />
      </td>

      {/* 8. Actions */}
      <td className="py-4 pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5 opacity-90 transition">
          <button
            type="button"
            onClick={() => onEdit && onEdit(task)}
            title="Edit Task"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 transition"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(taskId)}
            title="Delete Task"
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
