import api from './axios';

export const noteService = {
  getNotes: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/notes`);
    return response.data; // e.g. { success: true, data: [...] }
  },

  createNote: async (projectId, noteData) => {
    const response = await api.post(`/projects/${projectId}/notes`, noteData);
    return response.data;
  },

  updateNote: async (projectId, noteId, noteData) => {
    const response = await api.patch(`/projects/${projectId}/notes/${noteId}`, noteData);
    return response.data;
  },

  deleteNote: async (projectId, noteId) => {
    const response = await api.delete(`/projects/${projectId}/notes/${noteId}`);
    return response.data;
  }
};
