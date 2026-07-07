import { ChevronDown } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: EnvironmentSelector.jsx
 * 
 * WHY THIS EXISTS:
 * Postman/Insomnia allow you to switch variables (like base URL, tokens) by environment.
 * The UI gives users context of what domain they are currently sending mock/test requests to.
 */
export default function EnvironmentSelector({ environments, activeEnvId, onEnvChange }) {
  const activeEnv = environments.find(e => e.id === activeEnvId) || environments[0];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
        Active Environment
      </h3>
      
      <div className="relative mb-4">
        <select
          value={activeEnvId}
          onChange={(e) => onEnvChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        >
          {environments.map(env => (
            <option key={env.id} value={env.id}>{env.name}</option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-[9px] font-semibold text-slate-400">
          Syncing with AWS Gateway...
        </span>
      </div>
    </div>
  );
}
