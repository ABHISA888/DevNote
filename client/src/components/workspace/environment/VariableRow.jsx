import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import HiddenValue from './HiddenValue';
import { EnvironmentBadge } from './Badges';

export default function VariableRow({ variable, onEdit, onDelete }) {
  const id = variable._id || variable.id;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getEnvShorthand = (env) => {
    if (env === 'Development') return 'DEV';
    if (env === 'Testing') return 'TST';
    return 'PRD';
  };

  return (
    <tr className="group border-b border-gray-100 transition-colors hover:bg-slate-50/50">
      {/* Variable Name & Description */}
      <td className="px-4 py-4 lg:px-6">
        <div>
          <p className="text-xs font-extrabold text-slate-800 font-mono tracking-tight">
            {variable.key}
          </p>
          {variable.description && (
            <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
              {variable.description}
            </p>
          )}
        </div>
      </td>

      {/* Value */}
      <td className="px-4 py-4 lg:px-6">
        <HiddenValue value={variable.value} isSecret={variable.isSecret} />
      </td>

      {/* Environment Badge */}
      <td className="px-4 py-4 lg:px-6">
        <EnvironmentBadge env={getEnvShorthand(variable.environment)} />
      </td>

      {/* Visibility Status */}
      <td className="px-4 py-4 lg:px-6">
        {variable.isSecret ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 uppercase tracking-wider">
            Secret
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200 uppercase tracking-wider">
            Plaintext
          </span>
        )}
      </td>

      {/* Last Updated */}
      <td className="hidden sm:table-cell px-4 py-4 lg:px-6">
        <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
          {formatDate(variable.updatedAt || variable.createdAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 lg:px-6">
        <div className="relative flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(variable)}
            className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition"
            title="Edit variable"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Delete variable"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
