import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteProjectModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl shadow-slate-900/20"
        style={{ animation: 'scaleIn 150ms ease' }}
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center px-6 pt-8 pb-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle size={26} className="text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Delete Project?</h2>
          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to permanently delete this project?<br />
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 border-t border-gray-100 px-6 py-4 bg-gray-50/50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 active:scale-95"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}
