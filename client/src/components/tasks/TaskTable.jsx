import TaskRow from './TaskRow';
import { Layers } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskTable.jsx
 * Displays MongoDB task items in a high-density, accessible layout.
 */

const COLUMNS = [
  { id: 'name',     label: 'TASK NAME',  className: 'pl-6 pr-4 w-[28%]' },
  { id: 'project',  label: 'PROJECT',    className: 'px-4 w-[16%]' },
  { id: 'priority', label: 'PRIORITY',   className: 'px-4' },
  { id: 'status',   label: 'STATUS',     className: 'px-4' },
  { id: 'duedate',  label: 'DUE DATE',   className: 'px-4' },
  { id: 'assigned', label: 'ASSIGNED',   className: 'px-4' },
  { id: 'progress', label: 'PROGRESS',   className: 'px-4 w-[14%]' },
  { id: 'actions',  label: 'ACTIONS',    className: 'pr-6 text-right' },
];

export default function TaskTable({ tasks = [], onEdit, onDelete, onUpdateProgress, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent mb-3" />
        <p className="text-xs font-semibold text-slate-500">Loading tasks from MongoDB...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-14 px-4 text-center shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
          <Layers size={24} />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No tasks found</h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Get started by creating your first project task. All tasks are saved securely in your MongoDB database.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[840px] border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/80">
            {COLUMNS.map((col) => (
              <th
                key={col.id}
                className={`py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 ${col.className}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task._id || task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateProgress={onUpdateProgress}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
