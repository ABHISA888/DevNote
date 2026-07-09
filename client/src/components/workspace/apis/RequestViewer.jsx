/**
 * 🎓 TEACHING MOMENT: RequestViewer.jsx
 * 
 * WHY THIS EXISTS:
 * Displays the expected shape of the payload sent to the server.
 * Uses a styled `<pre>` block to simulate a code editor experience (like Postman's Body tab).
 */
export default function RequestViewer({ contentType, body }) {
  if (!body) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Request Body</h4>
        <span className="text-[10px] font-extrabold text-primary-600">{contentType || 'application/json'}</span>
      </div>
      <div className="rounded-xl bg-[#1e1e2e] p-4 shadow-inner overflow-x-auto">
        <pre className="text-xs text-[#a6accd] font-mono leading-relaxed">
          <code>{body}</code>
        </pre>
      </div>
    </div>
  );
}
