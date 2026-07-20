import { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchX } from 'lucide-react';
import toast from 'react-hot-toast';

import TaskHeader     from './TaskHeader';
import TaskStatistics from './TaskStatistics';
import TaskTable      from '../../tasks/TaskTable';
import CreateTaskModal from '../../tasks/CreateTaskModal';
import EditTaskModal   from '../../tasks/EditTaskModal';
import DeleteTaskModal from '../../tasks/DeleteTaskModal';

import { BOARD_TASKS } from '../../../mock/tasks';

// Auto-progress by status
const STATUS_PROGRESS = {
  'TODO':        0,
  'IN PROGRESS': 50,
  'REVIEW':      80,
  'COMPLETED':   100,
};

export default function TasksTab({ project }) {
  const isGlobal = !project;

  const [tasks,           setTasks]           = useState(BOARD_TASKS);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [selectedProject, setSelectedProject] = useState('All Projects');

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTask,     setEditTask]     = useState(null);  // task object
  const [deleteTask,   setDeleteTask]   = useState(null);  // task object

  // ─── Filtered tasks ───────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.labels && t.labels.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesProject =
        !isGlobal || selectedProject === 'All Projects' || t.projectName === selectedProject;

      return matchesSearch && matchesProject;
    });
  }, [tasks, searchQuery, selectedProject, isGlobal]);

  // ─── Dynamic summary cards ────────────────────────────────────
  const dynamicStats = useMemo(() => {
    const pool = isGlobal && selectedProject !== 'All Projects'
      ? tasks.filter((t) => t.projectName === selectedProject)
      : tasks;

    const total     = pool.length;
    const todo      = pool.filter((t) => t.status === 'TODO').length;
    const inProgress = pool.filter((t) => t.status === 'IN PROGRESS').length;
    const review    = pool.filter((t) => t.status === 'REVIEW').length;
    const completed = pool.filter((t) => t.status === 'COMPLETED').length;

    return [
      { id: 'total',      label: 'Total Tasks', value: total.toString() },
      { id: 'todo',       label: 'Todo',        value: todo.toString(),       valueColor: 'text-slate-600' },
      { id: 'inprogress', label: 'In Progress', value: inProgress.toString(), valueColor: 'text-primary-600' },
      { id: 'review',     label: 'Review',      value: review.toString(),     valueColor: 'text-purple-500' },
      { id: 'completed',  label: 'Completed',   value: completed.toString(),  valueColor: 'text-emerald-500' },
    ];
  }, [tasks, selectedProject, isGlobal]);

  // ─── Handlers ─────────────────────────────────────────────────

  const handleOpenEdit = useCallback((taskId) => {
    const t = tasks.find((t) => t.id === taskId);
    if (t) setEditTask(t);
  }, [tasks]);

  const handleSaveEdit = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    toast.success('Task updated successfully.');
  }, []);

  const handleOpenDelete = useCallback((taskId) => {
    const t = tasks.find((t) => t.id === taskId);
    if (t) setDeleteTask(t);
  }, [tasks]);

  const handleConfirmDelete = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    toast('Task deleted.', { icon: '🗑️' });
  }, []);

  const handleStatusChange = useCallback((taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, progress: STATUS_PROGRESS[newStatus] ?? t.progress }
          : t
      )
    );
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProject('All Projects');
  };

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <TaskHeader
        projectName={project?.name || 'DevNote'}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        isGlobal={isGlobal}
        onNewTask={() => setIsCreateOpen(true)}
      />

      {/* Stats */}
      <TaskStatistics stats={dynamicStats} />

      {/* Table or Empty State */}
      {filteredTasks.length > 0 ? (
        <TaskTable
          tasks={filteredTasks}
          isGlobal={isGlobal}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <SearchX size={32} className="text-gray-400" />
          </div>
          {tasks.length === 0 ? (
            <>
              <h3 className="mb-1 text-lg font-bold text-gray-900">No Tasks Available</h3>
              <p className="mb-6 text-sm text-gray-500">Create your first task using the "New Task" button.</p>
            </>
          ) : (
            <>
              <h3 className="mb-1 text-lg font-bold text-gray-900">No tasks found</h3>
              <p className="mb-6 text-sm text-gray-500">Try changing your search or selecting another project.</p>
              <button
                onClick={handleResetFilters}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Modals ── */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditTaskModal
        isOpen={!!editTask}
        task={editTask}
        onClose={() => setEditTask(null)}
        onSave={handleSaveEdit}
      />

      <DeleteTaskModal
        isOpen={!!deleteTask}
        task={deleteTask}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
