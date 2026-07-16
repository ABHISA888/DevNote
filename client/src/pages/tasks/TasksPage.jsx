import TasksTab from '../../components/workspace/tasks/TasksTab';

export default function TasksPage() {
  // Using the redesigned unified TasksTab which handles board, list, stats, and modals natively.
  return (
    <div className="mx-auto w-full max-w-7xl">
      <TasksTab />
    </div>
  );
}
