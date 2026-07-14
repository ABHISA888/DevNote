import api from './axios';

/**
 * 🎓 TEACHING MOMENT: Service Layer Pattern
 * 
 * Centralizing resource-specific API calls ensures the UI stays "dumb" concerning backend URLs
 * and payload normalization.
 * 
 * - `getProjects`: Calls GET /api/projects, returns an array of projects.
 * - `createProject`: Calls POST /api/projects, sends the project form payload.
 */
export const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data; // e.g. { success: true, count: 12, data: [...] }
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data; // e.g. { success: true, message: "...", data: {...} }
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  pinProject: async (id) => {
    const response = await api.patch(`/projects/${id}/pin`);
    return response.data;
  },

  favoriteProject: async (id) => {
    const response = await api.patch(`/projects/${id}/favorite`);
    return response.data;
  },

  getTeam: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/team`);
    return response.data;
  },

  inviteTeamMember: async (projectId, githubUsername, role) => {
    const response = await api.post(`/projects/${projectId}/team`, { githubUsername, role });
    return response.data;
  },

  updateTeamMemberRole: async (projectId, memberId, role) => {
    const response = await api.put(`/projects/${projectId}/team/${memberId}`, { role });
    return response.data;
  },

  removeTeamMember: async (projectId, memberId) => {
    const response = await api.delete(`/projects/${projectId}/team/${memberId}`);
    return response.data;
  },

  searchGithubUsers: async (q) => {
    const response = await api.get(`/projects/github/search?q=${encodeURIComponent(q)}`);
    return response.data;
  },

  getGithubRepoInfo: async (owner, repo) => {
    const response = await api.get(`/projects/github/repo?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
    return response.data;
  },

  getProjectReadme: async (id) => {
    const response = await api.get(`/projects/${id}/readme`);
    return response.data;
  }
};
