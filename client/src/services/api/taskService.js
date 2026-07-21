import api from './axios';

export const taskService = {
  getTasks: async (params) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getProjectTasks: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};

export default taskService;
