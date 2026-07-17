import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { METHOD_OPTIONS, COLLECTION_OPTIONS } from '../../../constants/apiData';

const FIELD_CLASS = 'w-full rounded-xl border border-gray-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100';

const EMPTY_FORM = {
  name:            '',
  method:          'GET',
  url:             '',
  collection:      'Authentication',
  description:     '',
  headers:         'Content-Type: application/json\nAuthorization: Bearer <token>',
  requestBody:     '',
  responseBody:    '',
};

export default function AddApiModal({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM);

  /* Populate form when editing an existing endpoint */
  useEffect(() => {
    if (initialData) {
      setForm({
        name:         initialData.name         || '',
        method:       initialData.method        || 'GET',
        url:          initialData.url           || '',
        collection:   initialData._collection   || 'Authentication',
        description:  initialData.description   || '',
        headers:      (initialData.headers || []).map(h => `${h.key}: ${h.value}`).join('\n'),
        requestBody:  initialData.requestBody   || '',
        responseBody: initialData.responseBody  || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData, open]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.url.trim()) return;
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-in fade-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-slate-50 px-6 py-4">
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">
              {initialData ? 'Edit API Endpoint' : 'Add API Endpoint'}
            </h2>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              Document an endpoint for your project API catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-5">
            {/* Row 1: Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Endpoint Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Login API"
                className={FIELD_CLASS}
              />
            </div>

            {/* Row 2: Method + URL */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  Method *
                </label>
                <select value={form.method} onChange={set('method')} className={FIELD_CLASS}>
                  {METHOD_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  URL *
                </label>
                <input
                  type="text"
                  value={form.url}
                  onChange={set('url')}
                  placeholder="/api/auth/login"
                  className={`${FIELD_CLASS} font-mono`}
                />
              </div>
            </div>

            {/* Row 3: Collection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Collection
              </label>
              <select value={form.collection} onChange={set('collection')} className={FIELD_CLASS}>
                {COLLECTION_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Row 4: Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={set('description')}
                rows={3}
                placeholder="What does this endpoint do?"
                className={`${FIELD_CLASS} resize-none leading-relaxed`}
              />
            </div>

            {/* Row 5: Headers */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Headers
                <span className="ml-2 font-medium text-slate-400 normal-case tracking-normal">
                  (one per line, Key: Value)
                </span>
              </label>
              <textarea
                value={form.headers}
                onChange={set('headers')}
                rows={3}
                placeholder="Content-Type: application/json"
                className={`${FIELD_CLASS} font-mono resize-none`}
              />
            </div>

            {/* Row 6: Request Body */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Request Example
              </label>
              <textarea
                value={form.requestBody}
                onChange={set('requestBody')}
                rows={5}
                placeholder={`{\n  "email": "john@example.com",\n  "password": "••••••••"\n}`}
                className={`${FIELD_CLASS} font-mono resize-none`}
              />
            </div>

            {/* Row 7: Response Body */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Response Example
              </label>
              <textarea
                value={form.responseBody}
                onChange={set('responseBody')}
                rows={5}
                placeholder={`{\n  "success": true,\n  "token": "JWT_TOKEN"\n}`}
                className={`${FIELD_CLASS} font-mono resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4 bg-slate-50">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.name.trim() || !form.url.trim()}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
          >
            {initialData ? 'Save Changes' : 'Save API'}
          </button>
        </div>
      </div>
    </div>
  );
}
