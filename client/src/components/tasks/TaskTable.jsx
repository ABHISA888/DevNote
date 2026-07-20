import TaskRow from './TaskRow';

const BASE_COLUMNS = [
  { id: 'name',     label: 'TASK NAME',  className: 'pl-6 pr-4 w-[25%]' },
  { id: 'priority', label: 'PRIORITY',   className: 'px-4' },
  { id: 'status',   label: 'STATUS',     className: 'px-4' },
  { id: 'duedate',  label: 'DUE DATE',   className: 'px-4' },
  { id: 'assigned', label: 'ASSIGNED',   className: 'px-4' },
  { id: 'progress', label: 'PROGRESS',   className: 'pl-4 pr-4 w-[15%]' },
  { id: 'actions',  label: 'ACTIONS',    className: 'pr-6 text-right' },
];

export default function TaskTable({ tasks, isGlobal, onEdit, onDelete, onStatusChange }) {
  const columns = [...BASE_COLUMNS];
  if (isGlobal) {
    columns.splice(1, 0, { id: 'project', label: 'PROJECT', className: 'px-4' });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/80">
            {columns.map((col) => (
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
              key={task.id}
              {...task}
              isGlobal={isGlobal}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

