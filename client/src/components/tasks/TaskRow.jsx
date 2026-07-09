import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import AssignedUsers from './AssignedUsers';
import TaskProgressBar from './TaskProgressBar';
import { CheckCircle2, Circle } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskRow.jsx
 *
 * WHY THIS EXISTS:
 * This is the most critical reusable unit in the table. Think of it like a
 * single database row rendered as a UI component.
 *
 * HOW SAAS APPS USE ROWS:
 * - Linear: Each issue row is its own draggable component
 * - GitHub Projects: Each row maps to a pull request or issue
 * - Jira: Each row is a ticket with status transitions
 *
 * WHY ROWS MUST BE REUSABLE:
 * When we have 500 tasks from an API, React maps over an array and renders 500
 * <TaskRow /> components. If a bug exists in one, it's fixed for all 500 instantly.
 * This is props-driven architecture at its most powerful.
 *
 * FUTURE INTEGRATION:
 * The parent TaskTable will call: tasks.map(task => <TaskRow key={task.id} {...task} />)
 */
export default function TaskRow({ id, name, priority, status, dueDate, progress, isSelected, assignees, additionalAssignees }) {
  const isHighlighted = status === 'IN_PROGRESS';

  return (
    <tr className={`group border-b border-gray-100 transition-colors hover:bg-primary-50/40 ${isHighlighted ? 'border-l-2 border-l-indigo-500' : ''}`}>
      
      {/* ── Task Name Column ── */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-start gap-3">
          {/* Checkbox / Selected indicator */}
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

      {/* ── Priority Column ── */}
      <td className="px-4 py-4">
        <PriorityBadge priority={priority} />
      </td>

      {/* ── Status Column ── */}
      <td className="px-4 py-4">
        <StatusBadge status={status} />
      </td>

      {/* ── Due Date Column ── */}
      <td className="px-4 py-4">
        <span className="text-xs font-semibold text-slate-600">{dueDate}</span>
      </td>

      {/* ── Assigned Users Column ── */}
      <td className="px-4 py-4">
        <AssignedUsers assignees={assignees} additionalAssignees={additionalAssignees} />
      </td>

      {/* ── Progress Column ── */}
      <td className="py-4 pl-4 pr-6">
        <TaskProgressBar progress={progress} />
      </td>
    </tr>
  );
}
