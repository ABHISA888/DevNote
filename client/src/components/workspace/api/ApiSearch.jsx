import { Search } from 'lucide-react';

export default function ApiSearch({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search
        size={14}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search endpoints by name or URL..."
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-xs font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
