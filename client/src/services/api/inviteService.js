import api from './axios';

/**
 * 🎓 TEACHING MOMENT: Frontend Service Layer
 * 
 * WHY this exists:
 * We separate API calls from our React components so that:
 * 1. Components stay clean and focused on rendering UI.
 * 2. We can easily reuse the API logic across multiple components.
 * 3. If the backend URL changes, we only update it in one place!
 */
export const inviteService = {
  /**
   * Send an invitation to a user for a specific project.
   */
  sendInvite: async (projectId, data) => {
    // Matches: app.post('/api/projects/:projectId/invite', protect, inviteController.sendInvite);
    const response = await api.post(`/projects/${projectId}/invite`, data);
    return response.data;
  },

  /**
   * Fetch all pending invitations for a specific project.
   */
  getPendingInvites: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/invites`);
    return response.data;
  },

  /**
   * Verify an invitation token (Public Route)
   */
  verifyInvite: async (token) => {
    // Matches: router.get('/:token', inviteController.verifyInvite);
    const response = await api.get(`/invitations/${token}`);
    return response.data;
  },

  /**
   * Accept an invitation (Protected Route)
   */
  acceptInvite: async (token) => {
    // Matches: router.post('/:token/accept', protect, inviteController.acceptInvite);
    const response = await api.post(`/invitations/${token}/accept`);
    return response.data;
  }
};
