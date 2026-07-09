import { AlertTriangle, X } from 'lucide-react';

/**
 * DeleteConfirmModal — Confirmation dialog for project deletion.
 *
 * Props
 * ─────
 * isOpen       – boolean
 * projectTitle – string — shown in the body to confirm context
 * onCancel     – () => void
 * onConfirm    – () => void — caller handles context mutation + toast
 */
export default function DeleteConfirmModal({
  isOpen,
  projectTitle,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-gray-100 bg-white shadow-2xl">

        {/* Close × */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={16} />
        </button>

        {/* Body */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle size={22} className="text-red-500" />
          </div>

          <h2
            id="delete-modal-title"
            className="text-base font-extrabold text-slate-800"
          >
            Delete Project?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            You are about to permanently delete{' '}
            <span className="font-bold text-slate-700">"{projectTitle}"</span>.
            <br />
            <span className="text-xs font-semibold text-red-400">
              This action cannot be undone.
            </span>
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Footer */}
        <div className="flex items-center gap-3 p-4">
          <button
            id="delete-cancel-btn"
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            id="delete-confirm-btn"
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2.5 text-xs font-bold text-white shadow-sm shadow-red-200 transition hover:bg-red-600 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
