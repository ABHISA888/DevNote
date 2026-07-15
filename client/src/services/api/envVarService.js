import api from './axios';

export const envVarService = {
  getEnvVars: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/envvars`);
    return response.data; // e.g. { success: true, data: [...] }
  },

  createEnvVar: async (projectId, envVarData) => {
    const response = await api.post(`/projects/${projectId}/envvars`, envVarData);
    return response.data;
  },

  updateEnvVar: async (projectId, envVarId, envVarData) => {
    const response = await api.patch(`/projects/${projectId}/envvars/${envVarId}`, envVarData);
    return response.data;
  },

  deleteEnvVar: async (projectId, envVarId) => {
    const response = await api.delete(`/projects/${projectId}/envvars/${envVarId}`);
    return response.data;
  }
};
