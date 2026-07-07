import { Plus } from 'lucide-react';
import EndpointCard from './EndpointCard';

/**
 * 🎓 TEACHING MOMENT: ApiViewer.jsx
 * 
 * WHY THIS EXISTS:
 * Container for the active endpoint. In the future, this could stack multiple endpoints
 * or tabs for a split-pane view.
 */
export default function ApiViewer({ activeEndpoint }) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {activeEndpoint ? (
        <EndpointCard endpoint={activeEndpoint} />
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-xs">
          Select an API to view documentation
        </div>
      )}

      {/* Add another endpoint placeholder */}
      {activeEndpoint && (
        <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50/50 p-6 text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-500 transition">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
            <Plus size={16} />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            Add another endpoint card to your documentation
          </span>
        </button>
      )}
    </div>
  );
}
