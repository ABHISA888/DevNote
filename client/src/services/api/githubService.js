import api from './axios';

export const githubService = {
  searchUsers: async (q) => {
    const response = await api.get(`/github/users/search?q=${encodeURIComponent(q)}`);
    return response.data;
  },

  getUserProfile: async (username) => {
    const response = await api.get(`/github/user/${encodeURIComponent(username)}`);
    return response.data;
  },

  getRepository: async (owner, repo) => {
    const response = await api.get(`/github/repository?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
    return response.data;
  },

  getReadme: async (owner, repo) => {
    const response = await api.get(`/github/readme?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
    return response.data;
  },

  getContributors: async (owner, repo) => {
    const response = await api.get(`/github/contributors?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
    return response.data;
  },

  getLanguages: async (owner, repo) => {
    const response = await api.get(`/github/languages?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
    return response.data;
  }
};
