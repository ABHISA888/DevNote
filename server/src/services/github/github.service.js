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

/**
 * Fetch and decode a file from the repository
 */
exports.getFileContent = async (owner, repo, path) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`, {
      headers: getHeaders()
    });
    if (response.data && response.data.content) {
      return Buffer.from(response.data.content, 'base64').toString('utf8');
    }
    return null;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.warn(`File not found: ${path} for ${owner}/${repo}`);
    return null;
  }
};

/**
 * Detect frameworks/technologies from repository contents and configuration files
 */
exports.detectFrameworks = async (owner, repo, homepage) => {
  const detected = new Set();

  const filesToFetch = [
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'client/package.json',
    'server/package.json',
    'vercel.json',
    'netlify.toml',
    'render.yaml'
  ];

  const fileContents = {};
  
  const fetchPromises = filesToFetch.map(async (file) => {
    try {
      const content = await exports.getFileContent(owner, repo, file);
      return { file, content };
    } catch (e) {
      return { file, content: null };
    }
  });

  const results = await Promise.all(fetchPromises);
  for (const res of results) {
    if (res.content) {
      fileContents[res.file] = res.content;
    }
  }

  const packageJsons = [];
  if (fileContents['package.json']) packageJsons.push(fileContents['package.json']);
  if (fileContents['client/package.json']) packageJsons.push(fileContents['client/package.json']);
  if (fileContents['server/package.json']) packageJsons.push(fileContents['server/package.json']);

  let allDepsStr = '';
  for (const pkgStr of packageJsons) {
    try {
      const pkg = JSON.parse(pkgStr);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      allDepsStr += ' ' + Object.keys(deps).join(' ') + ' ';
    } catch (e) {
      allDepsStr += ' ' + pkgStr + ' ';
    }
  }

  let lockfilesStr = '';
  if (fileContents['package-lock.json']) lockfilesStr += ' ' + fileContents['package-lock.json'] + ' ';
  if (fileContents['yarn.lock']) lockfilesStr += ' ' + fileContents['yarn.lock'] + ' ';
  if (fileContents['pnpm-lock.yaml']) lockfilesStr += ' ' + fileContents['pnpm-lock.yaml'] + ' ';

  const combinedSearchStr = (allDepsStr + lockfilesStr).toLowerCase();

  if (packageJsons.length > 0 || lockfilesStr.length > 0) {
    detected.add('Node.js');
  }

  // Detect Frontend Frameworks
  if (combinedSearchStr.includes('react')) detected.add('React');
  if (combinedSearchStr.includes('next')) detected.add('Next.js');
  if (combinedSearchStr.includes('vue')) detected.add('Vue');
  if (combinedSearchStr.includes('angular')) detected.add('Angular');
  if (combinedSearchStr.includes('svelte')) detected.add('Svelte');
  if (combinedSearchStr.includes('vite')) detected.add('Vite');

  // Detect Backend
  if (combinedSearchStr.includes('express')) detected.add('Express');
  if (combinedSearchStr.includes('nestjs')) detected.add('NestJS');

  // Detect Databases
  if (combinedSearchStr.includes('mongodb') || combinedSearchStr.includes('mongoose')) detected.add('MongoDB');
  if (combinedSearchStr.includes('pg') || combinedSearchStr.includes('postgres') || combinedSearchStr.includes('sequelize') || combinedSearchStr.includes('prisma')) {
    detected.add('PostgreSQL');
  }
  if (combinedSearchStr.includes('mysql') || combinedSearchStr.includes('mysql2')) detected.add('MySQL');
  if (combinedSearchStr.includes('firebase') || combinedSearchStr.includes('firebase-admin')) detected.add('Firebase');

  // Detect Styling
  if (combinedSearchStr.includes('tailwindcss')) detected.add('Tailwind CSS');
  if (combinedSearchStr.includes('bootstrap')) detected.add('Bootstrap');
  if (combinedSearchStr.includes('mui/material') || combinedSearchStr.includes('material-ui')) detected.add('Material UI');

  // Detect Deployment
  if (fileContents['vercel.json'] || combinedSearchStr.includes('vercel') || (homepage && homepage.includes('vercel.app'))) {
    detected.add('Vercel');
  }
  if (fileContents['netlify.toml'] || combinedSearchStr.includes('netlify') || (homepage && homepage.includes('netlify.app'))) {
    detected.add('Netlify');
  }
  if (fileContents['render.yaml'] || combinedSearchStr.includes('render') || (homepage && homepage.includes('onrender.com'))) {
    detected.add('Render');
  }

  return Array.from(detected);
};


