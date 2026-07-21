import TaskColumn from './TaskColumn';

export default function TaskBoard({ tasks = [] }) {
  const todoTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'todo');
  const inProgressTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'in progress');
  const reviewTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'review' || (t.status || '').toLowerCase() === 'in review');
  const completedTasks = tasks.filter((t) => (t.status || '').toLowerCase() === 'completed' || (t.status || '').toLowerCase() === 'done');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      <TaskColumn 
        title="Todo" 
        colorClass="bg-slate-400" 
        tasks={todoTasks} 
      />
      <TaskColumn 
        title="In Progress" 
        colorClass="bg-primary-500" 
        tasks={inProgressTasks} 
      />
      <TaskColumn 
        title="Review" 
        colorClass="bg-purple-500" 
        tasks={reviewTasks} 
      />
      <TaskColumn 
        title="Completed" 
        colorClass="bg-emerald-500" 
        tasks={completedTasks} 
      />
    </div>
  );
}
