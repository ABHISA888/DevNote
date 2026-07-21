import React, { useState, useRef, useEffect } from 'react';
import { X, Search, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_MEMBERS } from '../../mock/membersData';

export default function MembersModal({ isOpen, onClose }) {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All Members');

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [inviteMessage, setInviteMessage] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (filter !== 'All Members') {
      if (filter === 'Pending') {
        matchesFilter = member.status === 'Pending';
      } else {
        matchesFilter = member.role === filter;
      }
    }

    return matchesSearch && matchesFilter;
  });

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      toast.error('Email is required');
      return;
    }
    
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${inviteEmail}&backgroundColor=slate`
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setInviteRole('Viewer');
    setInviteMessage('');
    toast.success('Invitation sent successfully.');
  };

  const handleRemoveMember = (id, role) => {
    if (role === 'Owner') {
      toast.error('Owner cannot be removed.');
      return;
    }
    setMembers(members.filter(m => m.id !== id));
    toast.success('Member removed');
  };

  const handleEditRole = (id, newRole, role) => {
    if (role === 'Owner') {
      toast.error('Owner role cannot be changed.');
      return;
    }
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
    toast.success('Role updated');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      style={{ animation: 'fadeIn 150ms ease' }}
    >
      <div 
        className="relative w-full max-w-[700px] max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl shadow-slate-900/20"
        style={{ animation: 'scaleIn 150ms ease' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Team Members</h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500">Manage project members and invite collaborators.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Section 1: Current Members */}
          <section>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Search Members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-9 w-full sm:w-36 rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition hover:border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              >
                <option value="All Members">All Members</option>
                <option value="Owner">Owner</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Members List */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden min-h-[150px]">
              {filteredMembers.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{member.name}</p>
                          <p className="text-xs font-medium text-slate-500">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          member.role === 'Owner' ? 'bg-purple-50 text-purple-600' :
                          member.role === 'Editor' ? 'bg-blue-50 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {member.role}
                        </span>
                        
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          member.status === 'Active' ? 'bg-green-50 text-green-600' :
                          'bg-yellow-50 text-yellow-600'
                        }`}>
                          {member.status}
                        </span>

                        <MemberActionMenu 
                          member={member} 
                          onRemove={() => handleRemoveMember(member.id, member.role)}
                          onEditRole={(newRole) => handleEditRole(member.id, newRole, member.role)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">No Members Yet</h3>
                  <p className="mt-1 text-xs text-slate-500 mb-4">Invite your teammates to collaborate.</p>
                  <button 
                    onClick={() => {
                      const emailInput = document.getElementById('inviteEmailInput');
                      if (emailInput) emailInput.focus();
                    }}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95"
                  >
                    Invite Member
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Invite New Member */}
          <section className="rounded-xl border border-gray-100 bg-slate-50/50 p-5">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Invite New Member</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    id="inviteEmailInput"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Message (Optional)</label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Write a welcome message..."
                  rows="2"
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setInviteEmail(''); setInviteMessage(''); }}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInvite}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

function MemberActionMenu({ member, onRemove, onEditRole }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div 
          className="absolute right-0 top-8 z-50 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg shadow-slate-900/10"
          style={{ animation: 'slideIn 150ms ease' }}
        >
          {member.role !== 'Owner' && (
            <>
              {member.role === 'Viewer' ? (
                <button
                  onClick={() => { setOpen(false); onEditRole('Editor'); }}
                  className="flex w-full items-center px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Make Editor
                </button>
              ) : (
                <button
                  onClick={() => { setOpen(false); onEditRole('Viewer'); }}
                  className="flex w-full items-center px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Make Viewer
                </button>
              )}
            </>
          )}
          
          <button
            onClick={() => { setOpen(false); onRemove(); }}
            className={`flex w-full items-center px-3 py-2 text-xs font-semibold transition ${
              member.role === 'Owner' 
                ? 'text-slate-400 cursor-not-allowed opacity-50' 
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            Remove Member
          </button>
        </div>
      )}
    </div>
  );
}
