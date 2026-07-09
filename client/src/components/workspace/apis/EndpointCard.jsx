import { Copy, Star } from 'lucide-react';
import RequestViewer from './RequestViewer';
import ResponseViewer from './ResponseViewer';

/**
 * 🎓 TEACHING MOMENT: EndpointCard.jsx
 * 
 * WHY THIS EXISTS:
 * Serves as the primary documentation viewer for a single API route.
 * Combines metadata, descriptions, and code blocks into a readable "Page".
 */
export default function EndpointCard({ endpoint }) {
  if (!endpoint) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex-1">
      {/* Endpoint URL Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-slate-50">
        <div className="flex items-center gap-3">
          <span className={`flex h-6 items-center justify-center rounded px-2 text-[10px] font-extrabold uppercase tracking-widest text-white ${
            endpoint.method === 'GET' ? 'bg-primary-500' : 
            endpoint.method === 'POST' ? 'bg-blue-500' : 
            endpoint.method === 'PUT' ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {endpoint.method}
          </span>
          <span className="text-sm font-bold text-slate-800 font-mono tracking-tight">
            {endpoint.path}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-400 hover:bg-slate-200 rounded transition" title="Copy endpoint">
            <Copy size={16} />
          </button>
          <button className="p-1.5 text-slate-400 hover:bg-slate-200 rounded transition" title="Favorite">
            <Star size={16} />
          </button>
        </div>
      </div>

      {/* Endpoint Body */}
      <div className="px-6 py-6">
        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-extrabold text-slate-800 mb-1">{endpoint.name}</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {endpoint.description}
          </p>
        </div>

        {/* Payloads */}
        <RequestViewer 
          contentType={endpoint.requestContentType} 
          body={endpoint.requestBody} 
        />
        
        <ResponseViewer 
          status={endpoint.responseStatus} 
          time={endpoint.responseTime} 
          body={endpoint.responseBody} 
        />
      </div>
    </div>
  );
}
