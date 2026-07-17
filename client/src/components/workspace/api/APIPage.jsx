import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import APIStats from './APIStats';
import CollectionsSidebar from './CollectionsSidebar';
import EndpointList from './EndpointList';
import EndpointCard from './EndpointCard';
import ApiEmptyState from './ApiEmptyState';
import ApiSearch from './ApiSearch';
import AddApiModal from './AddApiModal';

import {
  API_COLLECTIONS,
  API_ENDPOINTS,
  COLLECTION_OPTIONS,
  COLLECTION_NAME_TO_ID,
} from '../../../constants/apiData';

// Parse "Key: Value" lines from the modal's headers textarea
function parseHeaderLines(text) {
  return (text || '')
    .split('\n')
    .map((line) => {
      const colon = line.indexOf(':');
      if (colon < 0) return null;
      return { key: line.slice(0, colon).trim(), value: line.slice(colon + 1).trim(), required: true };
    })
    .filter(Boolean);
}

// Convert modal form → endpoint object
function formToEndpoint(form, existingId) {
  const colName = form.collection;
  const colId   = COLLECTION_NAME_TO_ID[colName] || colName.toLowerCase();
  return {
    id:           existingId || `ep-${Date.now()}`,
    collectionId: colId,
    method:       form.method,
    name:         form.name.trim(),
    url:          form.url.trim(),
    description:  form.description.trim(),
    headers:      parseHeaderLines(form.headers),
    requestBody:  form.requestBody.trim() || null,
    responseBody: form.responseBody.trim() || null,
    note:         null,
    _collection:  colName,
  };
}

export default function APIPage() {
  // ── State ────────────────────────────────────────────────────────────────
  const [collections, setCollections]         = useState(API_COLLECTIONS);
  const [endpoints, setEndpoints]             = useState(API_ENDPOINTS);
  const [activeCollectionId, setActiveCollectionId] = useState(API_COLLECTIONS[0]?.id);
  const [selectedEndpoint, setSelectedEndpoint]     = useState(API_ENDPOINTS[0] || null);
  const [search, setSearch]                   = useState('');
  const [modalOpen, setModalOpen]             = useState(false);
  const [editTarget, setEditTarget]           = useState(null); // endpoint being edited

  // ── Derived data ─────────────────────────────────────────────────────────
  const filteredForCollection = useMemo(() => {
    const base = endpoints.filter((ep) => ep.collectionId === activeCollectionId);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (ep) =>
        ep.name.toLowerCase().includes(q) ||
        ep.url.toLowerCase().includes(q) ||
        (ep.description || '').toLowerCase().includes(q),
    );
  }, [endpoints, activeCollectionId, search]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCollectionSelect = (id) => {
    setActiveCollectionId(id);
    // Auto-select first endpoint in this collection
    const first = endpoints.find((ep) => ep.collectionId === id);
    setSelectedEndpoint(first || null);
    setSearch('');
  };

  const openAddModal = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEditModal = (ep) => {
    // Resolve _collection label from collectionId
    const col = collections.find((c) => c.id === ep.collectionId);
    const colName = col ? COLLECTION_OPTIONS.find((n) => COLLECTION_NAME_TO_ID[n] === col.id) || col.name : COLLECTION_OPTIONS[0];
    setEditTarget({ ...ep, _collection: colName });
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editTarget) {
      // ── Edit existing ──
      const updated = formToEndpoint(form, editTarget.id);
      setEndpoints((prev) => prev.map((ep) => (ep.id === editTarget.id ? updated : ep)));

      // Update collection counts if collection changed
      if (updated.collectionId !== editTarget.collectionId) {
        setCollections((prev) =>
          prev.map((col) => {
            if (col.id === editTarget.collectionId) return { ...col, count: Math.max(0, col.count - 1) };
            if (col.id === updated.collectionId)    return { ...col, count: col.count + 1 };
            return col;
          }),
        );
      }

      if (selectedEndpoint?.id === editTarget.id) setSelectedEndpoint(updated);
      toast.success('Endpoint updated.');
    } else {
      // ── Add new ──
      const created = formToEndpoint(form, null);
      setEndpoints((prev) => [...prev, created]);

      // Bump collection count (or add collection if it doesn't exist)
      setCollections((prev) => {
        const found = prev.find((c) => c.id === created.collectionId);
        if (found) return prev.map((c) => (c.id === created.collectionId ? { ...c, count: c.count + 1 } : c));
        // New collection
        return [
          ...prev,
          {
            id:    created.collectionId,
            name:  form.collection,
            icon:  'folder',
            count: 1,
          },
        ];
      });

      // Navigate to its collection and select it
      setActiveCollectionId(created.collectionId);
      setSelectedEndpoint(created);
      toast.success('API endpoint added.');
    }
  };

  const handleDelete = (id) => {
    const ep = endpoints.find((e) => e.id === id);
    if (!ep) return;

    setEndpoints((prev) => prev.filter((e) => e.id !== id));
    setCollections((prev) =>
      prev.map((c) => (c.id === ep.collectionId ? { ...c, count: Math.max(0, c.count - 1) } : c)),
    );

    if (selectedEndpoint?.id === id) {
      const next = endpoints.find((e) => e.id !== id && e.collectionId === ep.collectionId);
      setSelectedEndpoint(next || null);
    }
    toast.success('Endpoint deleted.');
  };

  const handleDuplicate = (ep) => {
    const duplicate = { ...ep, id: `ep-${Date.now()}`, name: `${ep.name} (Copy)` };
    setEndpoints((prev) => [...prev, duplicate]);
    setCollections((prev) =>
      prev.map((c) => (c.id === ep.collectionId ? { ...c, count: c.count + 1 } : c)),
    );
    toast.success('Endpoint duplicated.');
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

      {/* ── Page header ── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">Project API Documentation</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-400">
            Catalog and document your project's API endpoints for the team.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add API
        </button>
      </div>

      {/* ── Stats ── */}
      <APIStats />

      {/* ── Search bar ── */}
      <div className="mb-6 flex items-center gap-3">
        <ApiSearch value={search} onChange={setSearch} />
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

        {/* Left: Collections */}
        <CollectionsSidebar
          collections={collections}
          activeCollectionId={activeCollectionId}
          onSelect={handleCollectionSelect}
        />

        {/* Right: Endpoint list + detail */}
        <div className="flex flex-1 flex-col gap-4 min-w-0">

          {/* Collection title row */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                {collections.find((c) => c.id === activeCollectionId)?.name || 'Endpoints'}
              </h3>
              <p className="text-[11px] font-medium text-slate-400">
                {filteredForCollection.length} endpoint{filteredForCollection.length !== 1 ? 's' : ''}
                {search && ` matching "${search}"`}
              </p>
            </div>
          </div>

          {/* Endpoint list */}
          {filteredForCollection.length > 0 ? (
            <>
              <EndpointList
                endpoints={filteredForCollection}
                selectedId={selectedEndpoint?.id}
                onSelect={setSelectedEndpoint}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />

              {/* Detail card */}
              {selectedEndpoint && (
                <EndpointCard endpoint={selectedEndpoint} />
              )}
            </>
          ) : (
            <ApiEmptyState onAdd={openAddModal} />
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <AddApiModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />
    </div>
  );
}
