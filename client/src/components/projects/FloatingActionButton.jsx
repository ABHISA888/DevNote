import { Plus } from 'lucide-react';

export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-transform hover:scale-110 hover:bg-primary-700 active:scale-95"
      aria-label="Create New Project"
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  );
}

