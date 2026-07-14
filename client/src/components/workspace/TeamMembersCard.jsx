import { useState, useEffect } from 'react';
import { Plus, Trash2, UserPlus, Shield, X, ExternalLink, Check, Loader2 } from 'lucide-react';
import { projectService } from '../../services/api/projectService';
import toast from 'react-hot-toast';

function MemberRow({ member, onRoleChange, onRemove, isProjectOwner, primaryOwnerId }) {
  const isPrimaryOwner = member.user && member.user._id === primaryOwnerId;

  // Generate initials
  const nameToUse = member.displayName || member.githubUsername || 'Contributor';
  const initials = nameToUse
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleColors = {
    Owner: 'bg-indigo-100 text-indigo-800',
    Editor: 'bg-emerald-100 text-emerald-800',
    Viewer: 'bg-slate-100 text-slate-800',
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-2.5 min-w-0">
        {member.githubAvatar ? (
          <img
            src={member.githubAvatar}
            alt={nameToUse}
            className="h-8 w-8 rounded-full border border-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-xs font-bold text-slate-800 truncate">
            {member.displayName}
            {member.githubUrl && (
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <ExternalLink size={10} />
              </a>
            )}
          </p>
          <p className="text-[10px] font-semibold text-slate-400 truncate">
            @{member.githubUsername}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isProjectOwner && !isPrimaryOwner ? (
          <div className="flex items-center gap-1">
            <select
              value={member.role}
              onChange={(e) => onRoleChange(member._id, e.target.value)}
              className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-600 outline-none cursor-pointer focus:border-indigo-400"
            >
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button
              onClick={() => onRemove(member._id)}
              className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
              title="Remove member"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ) : (
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${roleColors[member.role] || 'bg-slate-100 text-slate-700'}`}>
            {member.role}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TeamMembersCard({
  projectId,
  members = [],
  primaryOwnerId,
  isProjectOwner,
  onInvite,
  onRemove,
  onRoleChange,
}) {
  const [showInviteArea, setShowInviteArea] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Viewer');
  const [invitingUsername, setInvitingUsername] = useState('');

  // Debounced search on GitHub
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await projectService.searchGithubUsers(searchQuery);
        if (res.success) {
          setSearchResults(res.items || []);
        }
      } catch (err) {
        console.error('Github search error:', err);
      } finally {
        setSearching(false);
      }
    }, 450);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleAddMember = async (username) => {
    try {
      setInvitingUsername(username);
      const res = await projectService.inviteTeamMember(projectId, username, selectedRole);
      if (res.success) {
        toast.success(`Successfully added @${username} to the team`);
        onInvite(res.data);
        // Clear search
        setSearchQuery('');
        setSearchResults([]);
        setShowInviteArea(false);
      } else {
        toast.error(res.message || 'Failed to add team member');
      }
    } catch (err) {
      console.error('Error inviting team member:', err);
      toast.error(err.response?.data?.message || 'Failed to add team member');
    } finally {
      setInvitingUsername('');
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Project Team
        </h3>
        {isProjectOwner && (
          <button
            onClick={() => setShowInviteArea(!showInviteArea)}
            className="flex items-center gap-1 rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            {showInviteArea ? (
              <>
                <X size={10} /> Close
              </>
            ) : (
              <>
                <Plus size={10} /> Add Member
              </>
            )}
          </button>
        )}
      </div>

      {/* ── Invite/GitHub Search Area ── */}
      {showInviteArea && (
        <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search GitHub username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400"
              />
              {searching && (
                <Loader2 size={12} className="absolute right-2.5 top-1.5 animate-spin text-slate-400" />
              )}
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded border border-slate-200 bg-white px-1.5 py-1 text-xs font-bold text-slate-600 outline-none cursor-pointer focus:border-indigo-400"
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          {/* Results List */}
          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto rounded border border-slate-200 bg-white shadow-sm flex flex-col divide-y divide-slate-100">
              {searchResults.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-slate-50">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="h-6 w-6 rounded-full object-cover border border-slate-100"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 truncate">@{user.login}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddMember(user.login)}
                    disabled={invitingUsername === user.login}
                    className="flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[9px] font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
                  >
                    {invitingUsername === user.login ? (
                      <Loader2 size={8} className="animate-spin" />
                    ) : (
                      <UserPlus size={8} />
                    )}
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchQuery && !searching && searchResults.length === 0 && (
            <p className="text-center text-[10px] font-semibold text-slate-400 py-1">
              No matching GitHub users found
            </p>
          )}
        </div>
      )}

      {/* ── Members List ── */}
      {members.length === 0 ? (
        <p className="text-xs font-semibold text-slate-400 py-2 text-center">
          No team members added.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {members.map((member) => (
            <MemberRow
              key={member._id}
              member={member}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
              isProjectOwner={isProjectOwner}
              primaryOwnerId={primaryOwnerId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
