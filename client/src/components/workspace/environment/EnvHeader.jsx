import { FileText, Plus, AlertTriangle } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: EnvHeader.jsx
 * 
 * WHY THIS EXISTS:
 * This component provides context and actions for the Environment Variables module.
 * It prominently features a security warning banner to continuously educate developers
 * about the risks of exposing secrets in frontend code.
 */
export default function EnvHeader() {
  return (
    <div className="mb-8">
      {/* Security Warning Banner */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-amber-800">
        <AlertTriangle size={18} className="text-amber-500 shrink-0" />
        <p className="text-xs font-semibold">
          Never expose sensitive environment variables in client-side code. Use server-side fetching for all secrets.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Environment Variables</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Securely manage your project's secrets and configuration values.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600">
            <FileText size={14} /> Import .env File
          </button>
          <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700">
            <Plus size={14} strokeWidth={2.5} /> Add Variable
          </button>
        </div>
      </div>
    </div>
  );
}
