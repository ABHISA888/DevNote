import TaskCard from './TaskCard';

export default function TaskColumn({ title, colorClass, tasks }) {
  return (
    <div className="flex flex-col w-full">
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
          {title}
        </h3>
        <span className="flex h-5 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[10px] font-bold text-slate-500">
          {tasks.length}
        </span>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3 min-h-[150px] rounded-lg bg-slate-50/50 p-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-gray-200 text-xs font-semibold text-gray-400">
            No tasks available.
          </div>
        )}
      </div>
    </div>
  );
}
