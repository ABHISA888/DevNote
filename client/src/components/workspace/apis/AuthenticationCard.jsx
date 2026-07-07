import { Key } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: AuthenticationCard.jsx
 * 
 * WHY THIS EXISTS:
 * Specifies the active authentication method for the workspace/environment.
 * Inherited auth settings prevent developers from having to manually inject
 * a Bearer token into every single endpoint request header.
 */
export default function AuthenticationCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Authentication
        </h3>
        <button className="text-[9px] font-extrabold text-indigo-600 hover:text-indigo-700">
          Edit
        </button>
      </div>
      
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Key size={14} className="text-indigo-500" />
          <span className="text-xs font-extrabold text-slate-800">JWT / Bearer</span>
        </div>
        <p className="text-[9px] font-semibold text-slate-500 ml-5">
          Shared auth for Gateway routes...
        </p>
      </div>

      <button className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-indigo-600 transition border border-dashed border-gray-200 rounded-lg py-2 hover:border-indigo-200 hover:bg-indigo-50/50">
        + Add Header Override
      </button>
    </div>
  );
}
