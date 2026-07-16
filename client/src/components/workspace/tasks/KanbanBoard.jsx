import KanbanColumn from './KanbanColumn';

/**
 * 🎓 TEACHING MOMENT: KanbanBoard.jsx
 * 
 * WHY THIS EXISTS:
 * This component brings together the columns into a responsive layout.
 * We use a CSS grid layout, ensuring the board adapts to different screen sizes.
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
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
        colorClass="bg-primary-500" 
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
        colorClass="bg-primary-500" 
        tasks={completedTasks} 
      />
    </div>
  );
}
