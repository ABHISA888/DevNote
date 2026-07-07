import { Search } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: SearchBar.jsx
 * 
 * WHY THIS EXISTS:
 * A reusable search input specifically for the sidebar to filter notes by title or content.
 */
export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative mb-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <Search size={14} />
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-gray-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
