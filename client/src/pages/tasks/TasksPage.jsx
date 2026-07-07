import { useState } from 'react';
import TasksHeader from '../../components/tasks/TasksHeader';
import TaskTable from '../../components/tasks/TaskTable';
import TaskPagination from '../../components/tasks/TaskPagination';
import CreateTaskModal from '../../components/tasks/CreateTaskModal';
import { TASKS, TASK_TOTAL_COUNT, TASK_CURRENT_PAGE_COUNT } from '../../constants/tasksData';

/**
 * 🎓 TEACHING MOMENT: TasksPage.jsx — The Composition Root
 *
 * COMPONENT HIERARCHY VISUALIZED:
 *
 * TasksPage (state: isModalOpen)
 * ├── CreateTaskModal (receives: isOpen, onClose)
 * ├── TasksHeader (receives: onNewTask callback)
 * └── [Table Container]
 *     ├── TaskTable (receives: tasks array)
 *     │   └── TaskRow (receives: individual task props)
 *     │       ├── PriorityBadge
 *     │       ├── StatusBadge
 *     │       ├── AssignedUsers
 *     │       └── TaskProgressBar
 *     └── TaskPagination
 *
 * STATE MANAGEMENT PATTERN:
 * `isModalOpen` lives here — NOT in TasksHeader or the button itself.
 * This is "Lifting State Up". The button triggers it, the modal reads it,
 * but the single source of truth is this page component.
 *
 * FUTURE BACKEND INTEGRATION:
 * Replace the `TASKS` import with:
 *   const { data: tasks, isLoading } = useFetchTasks({ projectId: 'devlaunch-core' });
 * Then conditionally render <TaskLoadingState /> when isLoading is true.
 */
export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ── Page Header & Actions ── */}
      <TasksHeader onNewTask={() => setIsModalOpen(true)} />

      {/* ── Task Table (with Pagination inside its container) ── */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <TaskTable tasks={TASKS} />
        <TaskPagination
          showing={TASK_CURRENT_PAGE_COUNT}
          total={TASK_TOTAL_COUNT}
          onPrev={() => {/* placeholder */}}
          onNext={() => {/* placeholder */}}
        />
      </div>

      {/* ── Create Task Modal (conditionally rendered) ── */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
