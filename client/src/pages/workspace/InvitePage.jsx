import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { inviteService } from '../../services/api/inviteService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function InvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState(null);
  const [inviteData, setInviteData] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await inviteService.verifyInvite(token);
        setInviteData(response.data); // { projectId, project, invitedBy, role, email }
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired invitation link.');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleAccept = async () => {
    if (!user) {
      toast.error('You must be logged in to accept this invitation.');
      // Pass the redirect URL so they return here after login
      navigate(`/login?redirect=/invite/${token}`);
      return;
    }

    // Verify if the logged in user matches the invited email
    if (user.email.toLowerCase() !== inviteData.email.toLowerCase()) {
      toast.error(`This invitation was sent to ${inviteData.email}, but you are logged in as ${user.email}.`);
      return;
    }

    setAccepting(true);
    try {
      const response = await inviteService.acceptInvite(token);
      toast.success('Invitation accepted successfully!');
      navigate(`/project/${response.data.projectId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept invitation.');
      setError(err.response?.data?.message || 'Failed to accept invitation.');
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-800">Invalid Invitation</h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <Link
            to="/dashboard"
            className="inline-block w-full rounded-lg bg-primary-600 px-4 py-2.5 font-bold text-white transition hover:bg-primary-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50" style={{ animation: 'scaleIn 200ms ease' }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-slate-800">You're Invited!</h1>
        <p className="text-slate-600 mb-6">
          <span className="font-semibold text-slate-900">{inviteData?.invitedBy}</span> has invited you to collaborate on <span className="font-semibold text-slate-900">{inviteData?.project}</span> as a <span className="capitalize font-semibold">{inviteData?.role}</span>.
        </p>

        {!user ? (
          <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 text-left border border-yellow-200">
            <p className="font-semibold mb-1">Login Required</p>
            <p>You must log in to accept this invitation. We'll bring you right back here after you log in.</p>
          </div>
        ) : user.email.toLowerCase() !== inviteData?.email.toLowerCase() ? (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 text-left border border-red-200">
            <p className="font-semibold mb-1">Account Mismatch</p>
            <p>This invite was sent to <strong>{inviteData?.email}</strong>, but you are currently logged in as <strong>{user.email}</strong>. Please switch accounts.</p>
          </div>
        ) : null}

        <button
          onClick={handleAccept}
          disabled={accepting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {accepting && <Loader2 size={18} className="animate-spin" />}
          {accepting ? 'Accepting...' : 'Accept Invitation'}
        </button>

        <p className="mt-4 text-xs text-slate-400">
          This invitation is tied to the email {inviteData?.email}.
        </p>

        <style>{`
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
        `}</style>
      </div>
    </div>
  );
}
