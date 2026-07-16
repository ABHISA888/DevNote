import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

/**
 * 🎓 TEACHING MOMENT: KanbanColumn.jsx
 * 
 * WHY THIS EXISTS:
 * A column abstracts the layout and rendering of a specific status bucket.
 * It prepares the HTML structure for drag-and-drop integration (e.g. `react-beautiful-dnd`'s Droppable).
 * 
 * BACKEND SYNC:
 * When a card drops here, we dispatch an action: updateTaskStatus(taskId, columnId).
 */
export default function KanbanColumn({ id, title, colorClass, tasks, onAddTask }) {
  return (
    <div className="flex flex-col w-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
            {title}
          </h3>
          <span className="flex h-5 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[10px] font-bold text-slate-500">
            {tasks.length}
          </span>
        </div>
        
        {onAddTask && (
          <button 
            onClick={onAddTask}
            className="text-slate-400 hover:text-slate-800 transition p-1"
            aria-label={`Add task to ${title}`}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Task List (Droppable Zone Area) */}
      <div className="flex flex-col gap-3 min-h-[150px] rounded-xl bg-slate-50/50 p-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            No tasks yet.
          </div>
        )}
      </div>
    </div>
  );
}
