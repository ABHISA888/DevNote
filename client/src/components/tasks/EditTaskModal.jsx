import { useState, useEffect } from 'react';
import { X, Pencil, Calendar } from 'lucide-react';

const PRIORITIES = ['HIGH', 'MEDIUM', 'LOW', 'NORMAL'];
const STATUSES   = ['TODO', 'IN PROGRESS', 'REVIEW', 'COMPLETED'];

const PRIORITY_STYLES = {
  HIGH:   'bg-red-600 text-white',
  MEDIUM: 'bg-blue-600 text-white',
  LOW:    'bg-slate-600 text-white',
  NORMAL: 'bg-slate-200 text-slate-700',
};

const STATUS_PROGRESS = {
  'TODO':       0,
  'IN PROGRESS': 50,
  'REVIEW':     80,
  'COMPLETED':  100,
};

export default function EditTaskModal({ isOpen, task, onClose, onSave }) {
  const [form, setForm] = useState({});
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Sync form whenever task changes
  useEffect(() => {
    if (task) {
      setForm({
        name:        task.name        ?? '',
        description: task.description ?? '',
        priority:    task.priority    ?? 'MEDIUM',
        status:      task.status      ?? 'TODO',
        dueDate:     task.dueDate     ?? '',
        progress:    task.progress    ?? 0,
        projectName: task.projectName ?? '',
      });
      setTags(task.labels ?? []);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleStatusChange = (newStatus) => {
    set('status',   newStatus);
    set('progress', STATUS_PROGRESS[newStatus] ?? 0);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSave = () => {
    onSave({ ...task, ...form, labels: tags });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      style={{ animation: 'fadeIn 150ms ease' }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl shadow-slate-900/20"
        style={{ animation: 'scaleIn 150ms ease' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Edit Task</h2>
            <p className="mt-0.5 text-xs font-medium text-primary-500">{task.id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-5">

          {/* Task Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Task Name</label>
            <div className="relative">
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
              <Pencil size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Project (Read Only) & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Project <span className="font-normal text-slate-400">(read-only)</span></label>
              <div className="flex h-10 items-center rounded-lg border border-gray-100 bg-gray-100 px-3">
                <span className="text-xs font-semibold text-slate-500">{form.projectName || '—'}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Due Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={form.dueDate}
                  onChange={(e) => set('dueDate', e.target.value)}
                  placeholder="e.g. Oct 29, 2023"
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
                <Calendar size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Priority</label>
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set('priority', p)}
                  className={`flex-1 py-2 text-[11px] font-bold transition ${
                    form.priority === p ? PRIORITY_STYLES[p] : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Status</label>
            <div className="grid grid-cols-4 gap-2">
              {STATUSES.map((s) => {
                const active = form.status === s;
                const colorMap = {
                  'TODO':        active ? 'bg-slate-600 text-white' : 'bg-white text-slate-500',
                  'IN PROGRESS': active ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500',
                  'REVIEW':      active ? 'bg-purple-600 text-white' : 'bg-white text-slate-500',
                  'COMPLETED':   active ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500',
                };
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(s)}
                    className={`rounded-lg border border-gray-200 py-2 text-[10px] font-bold transition ${colorMap[s]}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Progress</label>
              <span className="text-xs font-bold text-primary-600">{form.progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={form.progress}
              onChange={(e) => set('progress', Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-indigo-600"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Tags</label>
            <div className="flex min-h-[40px] flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-0.5 text-[10px] font-bold text-primary-700"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-0.5 text-primary-400 hover:text-primary-700">×</button>
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

        </div>

        {/* Footer */}
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
            onClick={handleSave}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}
