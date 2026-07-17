import { Folder, Lock, Users, CheckSquare, FileText, Settings } from 'lucide-react';

const COLLECTION_ICONS = {
  lock:     Lock,
  user:     Users,
  folder:   Folder,
  check:    CheckSquare,
  file:     FileText,
  settings: Settings,
};

export default function CollectionsSidebar({ collections, activeCollectionId, onSelect }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden w-full lg:w-[260px] shrink-0">
      {/* Header */}
      <div className="border-b border-gray-100 bg-slate-50 px-4 py-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
          Collections
        </h3>
      </div>

      {/* Items */}
      <div className="flex flex-col py-2">
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;
          const Icon     = COLLECTION_ICONS[col.icon] || Folder;

          return (
            <button
              key={col.id}
              onClick={() => onSelect(col.id)}
              className={`group flex items-center justify-between border-l-2 px-4 py-3 transition-all duration-150 ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50/60'
                  : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={14}
                  className={`transition-colors ${
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <div className="text-left">
                  <span className={`block text-xs font-bold ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {col.name}
                  </span>
                  <span className="block text-[10px] font-medium text-slate-400">
                    {col.count} endpoint{col.count !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {col.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
