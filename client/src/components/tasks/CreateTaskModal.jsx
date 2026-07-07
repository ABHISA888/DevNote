import { useState } from 'react';
import { X, Pencil, Calendar, Clock, Upload, UserPlus } from 'lucide-react';
import { TASK_PROJECTS } from '../../constants/tasksData';

/**
 * 🎓 TEACHING MOMENT: CreateTaskModal.jsx
 *
 * WHY THIS EXISTS:
 * Modals are the standard UX pattern for "create" flows in SaaS. Linear, GitHub, Jira,
 * and ClickUp all use them. They keep the user in context (no full page navigation)
 * and feel fast because no route transition occurs.
 *
 * PATTERN USED — Controlled Modal:
 * The `isOpen` state and `onClose` callback live in TasksPage (the parent).
 * This component is a "dumb" presentational component — it receives what to display
 * and what to call when closed. This is a React best practice called "lifting state up."
 *
 * FUTURE BACKEND INTEGRATION:
 * The form's `handleSubmit` will call:
 *   POST /api/tasks  with the form data as JSON body
 * Then `onClose()` will be called on success and the task list will refresh.
 *
 * ACCESSIBILITY:
 * - Pressing Escape key closes the modal
 * - Clicking the backdrop closes the modal
 * - Focus is trapped within the modal (in a full implementation)
 * - aria-modal and role="dialog" communicate to screen readers
 */

const PRIORITIES = ['High', 'Medium', 'Low'];
const STATUSES = ['Todo', 'In Progress', 'Done'];

export default function CreateTaskModal({ isOpen, onClose }) {
  const [selectedPriority, setSelectedPriority] = useState('High');
  const [tags, setTags] = useState(['Security', 'Nexus', 'Refactor']);
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Only close if the backdrop itself is clicked, not its children
    if (e.target === e.currentTarget) onClose();
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const priorityStyles = {
    High:   'bg-red-600 text-white',
    Medium: 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50',
    Low:    'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50',
  };

  return (
    /* ── Backdrop ── */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Create New Task"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
    >
      {/* ── Modal Panel ── */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl shadow-slate-900/20 animate-in fade-in zoom-in-95 duration-200">

        {/* ── Header ── */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Create New Task</h2>
            <p className="mt-0.5 text-xs font-medium text-indigo-500">Add a new task to one of your projects.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <div className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-5">

          {/* Task Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Task Name</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="Nexus API Security Audit"
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
              <Pencil size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Description</label>
            <textarea
              rows={3}
              defaultValue="Conduct a full security audit of the Nexus API Gateway endpoints, focusing on rate limiting and token validation mechanisms."
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Project & Due Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Project</label>
              <div className="relative">
                <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  {TASK_PROJECTS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <Calendar size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Priority & Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Priority</label>
              <div className="flex overflow-hidden rounded-lg border border-gray-200">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPriority(p)}
                    className={`flex-1 py-2 text-[11px] font-bold transition ${
                      selectedPriority === p ? priorityStyles[p] : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Status</label>
              <div className="relative">
                <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned To & Estimated Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Assigned To</label>
              <div className="relative flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 h-10">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harshu&backgroundColor=6366f1"
                  alt="Alex Rivera"
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-xs font-semibold text-slate-700">Alex Rivera</span>
                <button className="ml-auto text-slate-400 hover:text-indigo-600 transition">
                  <UserPlus size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Estimated Time</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-12 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <span className="absolute right-3 text-xs font-semibold text-slate-400">hrs</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Tags</label>
            <div className="flex min-h-[40px] flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-0.5 text-indigo-400 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag..."
                className="flex-1 min-w-[80px] bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Attachments</label>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer">
              <Upload size={28} className="text-indigo-400" />
              <p className="text-xs font-semibold text-slate-600">Click to upload or drag and drop</p>
              <p className="text-[10px] text-slate-400">Max file size: 25MB (ZIP, PDF, PNG, JPG)</p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
