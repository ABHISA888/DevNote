/**
 * 🎓 TEACHING MOMENT: ResponseViewer.jsx
 * 
 * WHY THIS EXISTS:
 * Previews the expected payload coming back from the server, along with its status code.
 * This acts as the contract that frontend engineers rely on when consuming the API.
 */
export default function ResponseViewer({ status, time, body }) {
  if (!body) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Last Response</h4>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-primary-600">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {status || '200 OK'}
          </span>
          {time && (
            <span className="text-[10px] font-bold text-slate-400">{time}</span>
          )}
        </div>
      </div>
      <div className="rounded-xl bg-[#1e1e2e] p-4 shadow-inner overflow-x-auto">
        <pre className="text-xs text-[#a6accd] font-mono leading-relaxed">
          <code>{body}</code>
        </pre>
      </div>
    </div>
  );
}
