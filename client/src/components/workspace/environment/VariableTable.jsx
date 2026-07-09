import VariableRow from './VariableRow';
import { Variable } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: VariableTable.jsx
 * 
 * WHY THIS EXISTS:
 * A semantic HTML `<table>` is the correct element for tabular, structured data.
 * Using divs/grids for tables is an anti-pattern that breaks accessibility (screen readers
 * rely on `<th>`, `<tr>`, `<td>` semantics to describe rows and columns).
 */
export default function VariableTable({ variables, onEdit, onDelete }) {
  if (variables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 rounded-xl border-2 border-dashed border-gray-200 bg-slate-50/50">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-400 mb-4">
          <Variable size={28} />
        </div>
        <h3 className="text-sm font-extrabold text-slate-700">No variables found</h3>
        <p className="mt-1 text-xs font-medium text-slate-400">Add your first environment variable to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-gray-100 bg-slate-50/50">
            <th className="px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Variable Name
            </th>
            <th className="px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Value
            </th>
            <th className="px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Environment
            </th>
            <th className="px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Category
            </th>
            <th className="hidden sm:table-cell px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Last Updated
            </th>
            <th className="px-4 py-3 lg:px-6 text-left text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <VariableRow
              key={variable.id}
              variable={variable}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
