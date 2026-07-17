import { Plus } from 'lucide-react';

export default function NewNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
    >
      <Plus size={14} strokeWidth={2.5} />
      New Note
    </button>
  );
}
