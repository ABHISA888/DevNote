const axios = require('axios');

const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'DevNote-App'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

/**
 * Search GitHub users by query
 */
exports.searchUsers = async (query) => {
  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, {
    headers: getHeaders()
  });
  return response.data.items || [];
};

/**
 * Get detailed GitHub profile for a user
 */
exports.getUserProfile = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: getHeaders()
  });
  return response.data;
};

/**
 * Get basic repository info
 */
exports.getRepositoryInfo = async (owner, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
    headers: getHeaders()
  });
  return response.data;
};

/**
 * Fetch and decode repository README
 */
exports.getReadme = async (owner, repo) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, {
      headers: getHeaders()
    });
    if (response.data && response.data.content) {
      return Buffer.from(response.data.content, 'base64').toString('utf8');
    }
    return '';
  } catch (error) {
    if (error.response?.status === 404) {
      return '';
    }
    throw error;
  }
};

/**
 * Get repository contributors list
 */
exports.getContributors = async (owner, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors`, {
    headers: getHeaders()
  });
  return response.data || [];
};

/**
 * Get repository languages
 */
exports.getLanguages = async (owner, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`, {
    headers: getHeaders()
  });
  return response.data || {};
};

/**
 * Get repository releases
 */
exports.getReleases = async (owner, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases`, {
    headers: getHeaders()
  });
  return response.data || [];
};
