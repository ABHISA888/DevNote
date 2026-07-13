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
  }
};
