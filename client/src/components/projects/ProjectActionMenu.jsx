import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

/**
 * ProjectActionMenu — Three-dot (⋮) dropdown attached to a project card.
 *
 * Props
 * ─────
 * project  – the full project object from context
 * onEdit   – () => void  — opens the edit wizard pre-filled
 * onDelete – () => void  — opens the delete confirmation modal
 */
export default function ProjectActionMenu({ project, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close on click-outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handle = (fn) => {
    setOpen(false);
    fn();
  };

  const menuItems = [
    {
      id: 'view',
      label: 'View Project',
      icon: Eye,
      className: 'text-slate-600 hover:bg-slate-50',
      action: () => navigate(`/project/${project.id}`),
    },
    {
      id: 'edit',
      label: 'Edit Project',
      icon: Pencil,
      className: 'text-slate-600 hover:bg-slate-50',
      action: onEdit,
    },
    {
      id: 'delete',
      label: 'Delete Project',
      icon: Trash2,
      className: 'text-red-500 hover:bg-red-50',
      action: onDelete,
      separator: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        id={`action-menu-trigger-${project.id}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-label="Project actions"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        <MoreVertical size={15} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="Project actions menu"
          className="absolute right-0 top-full z-50 mt-1.5 w-44 origin-top-right rounded-xl border border-gray-100 bg-white py-1 shadow-xl shadow-slate-200/60 animate-in"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id}>
                {item.separator && (
                  <div className="mx-2 my-1 h-px bg-gray-100" />
                )}
                <button
                  id={`action-${item.id}-${project.id}`}
                  type="button"
                  role="menuitem"
                  onClick={() => handle(item.action)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold transition ${item.className}`}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
