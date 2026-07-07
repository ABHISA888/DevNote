import TaskRow from './TaskRow';

/**
 * 🎓 TEACHING MOMENT: TaskTable.jsx
 *
 * WHY THIS EXISTS:
 * This component is the CONTAINER that provides the table skeleton (headers, body structure).
 * It does NOT know about individual tasks — it just receives an array and maps over rows.
 *
 * HOW HTML TABLES WORK IN REACT:
 *   <table>        → The wrapper
 *   <thead><tr>    → Header row with <th> column titles
 *   <tbody>        → The scrollable data section
 *   <tr>           → Each row (our <TaskRow /> component)
 *   <td>           → Each data cell inside a row
 *
 * WHY overflow-x-auto IS CRITICAL:
 * On mobile screens, wide tables overflow their container and cause horizontal page
 * scroll. Wrapping in a div with overflow-x-auto limits the scroll to just the table
 * container — a standard UX pattern used by GitHub, Linear, and every major SaaS.
 */

const COLUMNS = [
  { id: 'name',     label: 'TASK NAME',  className: 'pl-6 pr-4 w-[35%]' },
  { id: 'priority', label: 'PRIORITY',   className: 'px-4' },
  { id: 'status',   label: 'STATUS',     className: 'px-4' },
  { id: 'duedate',  label: 'DUE DATE',   className: 'px-4' },
  { id: 'assigned', label: 'ASSIGNED',   className: 'px-4' },
  { id: 'progress', label: 'PROGRESS',   className: 'pl-4 pr-6 w-[15%]' },
];

export default function TaskTable({ tasks }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse">
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
            <TaskRow key={task.id} {...task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
