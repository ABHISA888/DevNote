import { ChevronDown, Folder, FileJson } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: CollectionSidebar.jsx
 * 
 * WHY THIS EXISTS:
 * Serves as the primary navigation interface for the APIs module.
 * Grouping by collections (e.g. Authentication, Users) mirrors the hierarchical structure
 * standard in enterprise documentation tools like Postman and Swagger.
 */
export default function CollectionSidebar({ collections, recent, activeCollectionId, onCollectionSelect }) {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-[260px] shrink-0">
      {/* Collections Box */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between bg-slate-50 border-b border-gray-100 px-4 py-3">
          <h3 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">Collections</h3>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
        
        <div className="flex flex-col py-2">
          {collections.map((col) => {
            const isActive = activeCollectionId === col.id;
            return (
              <button
                key={col.id}
                onClick={() => onCollectionSelect(col.id)}
                className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                  isActive 
                    ? 'bg-indigo-50/50 border-l-2 border-indigo-600' 
                    : 'border-l-2 border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder size={14} className={isActive ? 'text-indigo-600 fill-indigo-100' : 'text-slate-400'} />
                  <span className={`text-xs font-bold ${isActive ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {col.name}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recently Viewed Box */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden p-4">
        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
          Recently Viewed
        </h3>
        
        <div className="flex flex-col gap-3">
          {recent.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-3 text-left group"
            >
              <span className={`text-[9px] font-extrabold uppercase tracking-widest w-8 ${
                item.method === 'GET' ? 'text-emerald-500' : 
                item.method === 'POST' ? 'text-blue-500' : 
                item.method === 'PUT' ? 'text-orange-500' : 'text-red-500'
              }`}>
                {item.method}
              </span>
              <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 transition truncate">
                {item.path}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
