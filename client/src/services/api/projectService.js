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

  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data; // e.g. { success: true, message: "...", data: {...} }
  }
};
