import { useState } from 'react';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import HiddenValue from './HiddenValue';
import { EnvironmentBadge, CategoryBadge } from './Badges';

/**
 * 🎓 TEACHING MOMENT: VariableRow.jsx
 * 
 * WHY THIS EXISTS:
 * This is the leaf node of our data layer — one row per environment variable.
 * Each row composes HiddenValue, EnvironmentBadge, and CategoryBadge together
 * to produce a compact, scannable, and actionable interface.
 */
export default function VariableRow({ variable, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

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

      {/* Value (Hidden by default) */}
      <td className="px-4 py-4 lg:px-6">
        <HiddenValue value={variable.value} />
      </td>

      {/* Environment Badges */}
      <td className="px-4 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-1">
          {variable.environments.map((env) => (
            <EnvironmentBadge key={env} env={env} />
          ))}
        </div>
      </td>

      {/* Category Badge */}
      <td className="px-4 py-4 lg:px-6">
        <CategoryBadge category={variable.category} />
      </td>

      {/* Last Updated */}
      <td className="hidden sm:table-cell px-4 py-4 lg:px-6">
        <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
          {variable.lastUpdated}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 lg:px-6">
        <div className="relative flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(variable)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
            title="Edit variable"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete?.(variable.id)}
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
