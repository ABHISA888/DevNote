/**
 * WorkspaceFooter.jsx — Minimal footer bar
 * Shows version, system status and support links.
 */
export default function WorkspaceFooter() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white px-4 sm:px-6 py-3">
      <div className="flex flex-col gap-2 text-[11px] font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>v2.4.0-stable</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary-500" />
            <span>System Operational</span>
          </div>
          <button className="transition hover:text-primary-600">Support</button>
        </div>
      </div>
    </footer>
  );
}
