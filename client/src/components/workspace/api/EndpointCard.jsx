import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { METHOD_COLORS } from '../../../constants/apiData';

function CodeBlock({ title, label, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">{title}</h4>
        <div className="flex items-center gap-3">
          {label && (
            <span className="text-[10px] font-bold text-indigo-600">{label}</span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-[#1e1e2e] px-5 py-4 shadow-inner overflow-x-auto">
        <pre className="text-xs leading-relaxed text-[#a6accd] font-mono whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function MethodBadge({ method }) {
  const c = METHOD_COLORS[method] || METHOD_COLORS.GET;
  return (
    <span className={`inline-flex items-center rounded px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest ${c.bg} ${c.text}`}>
      {method}
    </span>
  );
}

export default function EndpointCard({ endpoint }) {
  const [activeTab, setActiveTab] = useState('request');

  if (!endpoint) return null;

  const tabs = [
    { id: 'request',  label: 'Request'     },
    { id: 'response', label: 'Response'    },
    { id: 'headers',  label: 'Headers'     },
    { id: 'notes',    label: 'Description' },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
      {/* ── Header bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <MethodBadge method={endpoint.method} />
          <span className="text-sm font-bold text-slate-800 font-mono tracking-tight">
            {endpoint.url}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500 max-w-sm leading-relaxed">
          {endpoint.name}
        </p>
      </div>

      {/* ── Description strip ── */}
      <div className="border-b border-gray-100 px-6 py-4 bg-white">
        <p className="text-sm leading-relaxed text-slate-600">{endpoint.description}</p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-0 border-b border-gray-100 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-xs font-bold transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="px-6 py-6 flex flex-col gap-6">
        {activeTab === 'request' && (
          <CodeBlock
            title="Request Body"
            label="application/json"
            code={endpoint.requestBody || '// No request body required for this endpoint.'}
          />
        )}

        {activeTab === 'response' && (
          <CodeBlock
            title="Success Response"
            label="200 OK"
            code={endpoint.responseBody}
          />
        )}

        {activeTab === 'headers' && (
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-3">
              Request Headers
            </h4>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="py-2.5 px-4 text-left font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Header</th>
                    <th className="py-2.5 px-4 text-left font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Value</th>
                    <th className="py-2.5 px-4 text-left font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {(endpoint.headers || []).map((h, i) => (
                    <tr key={i} className={`border-b border-gray-50 transition hover:bg-slate-50/60 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <td className="py-3 px-4 font-bold text-slate-700 font-mono">{h.key}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono">{h.value}</td>
                      <td className="py-3 px-4">
                        {h.required ? (
                          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-600">Required</span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400">Optional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!endpoint.headers || endpoint.headers.length === 0) && (
                <p className="py-4 text-center text-xs font-bold text-slate-400">No headers defined.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-3">
              Notes
            </h4>
            {endpoint.note ? (
              <div className="flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50/40 px-4 py-4">
                <span className="mt-0.5 shrink-0 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">{endpoint.note}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium">No additional notes for this endpoint.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
