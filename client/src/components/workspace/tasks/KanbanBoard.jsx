import KanbanColumn from './KanbanColumn';
import ProductivityCard from './ProductivityCard';
import UpcomingDeadlinesCard from './UpcomingDeadlinesCard';
import LiveActivityCard from './LiveActivityCard';
import { PRODUCTIVITY_METRICS, TASK_DEADLINES, LIVE_ACTIVITY } from '../../../mock/tasks';

/**
 * 🎓 TEACHING MOMENT: KanbanBoard.jsx
 * 
 * WHY THIS EXISTS:
 * This component brings together the columns and sidebars into a responsive layout.
 * We use a horizontal scrolling flex container (`overflow-x-auto`) for the columns,
 * ensuring the board is usable on smaller screens without breaking the page layout.
 */
export default function KanbanBoard({ tasks }) {
  // Filter tasks into respective column buckets
  const todoTasks = tasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = tasks.filter((t) => t.status === 'IN PROGRESS');
  const reviewTasks = tasks.filter((t) => t.status === 'REVIEW');
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');

  // Placeholder handler for Add Task buttons
  const handleAddTask = () => {
    console.log('Open New Task Modal');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Board Columns Area */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          <KanbanColumn 
            id="TODO" 
            title="Todo" 
            colorClass="bg-slate-400" 
            tasks={todoTasks} 
            onAddTask={handleAddTask} 
          />
          <KanbanColumn 
            id="IN_PROGRESS" 
            title="In Progress" 
            colorClass="bg-indigo-500" 
            tasks={inProgressTasks} 
            onAddTask={handleAddTask} 
          />
          <KanbanColumn 
            id="REVIEW" 
            title="Review" 
            colorClass="bg-purple-500" 
            tasks={reviewTasks} 
            onAddTask={handleAddTask} 
          />
          <KanbanColumn 
            id="COMPLETED" 
            title="Completed" 
            colorClass="bg-emerald-500" 
            tasks={completedTasks} 
          />
        </div>
      </div>

      {/* Right Sidebar Widgets */}
      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
        <ProductivityCard 
          streak={PRODUCTIVITY_METRICS.streak} 
          avgTime={PRODUCTIVITY_METRICS.avgTime} 
        />
        <UpcomingDeadlinesCard deadlines={TASK_DEADLINES} />
        <LiveActivityCard activities={LIVE_ACTIVITY} />
      </div>
    </div>
  );
}
