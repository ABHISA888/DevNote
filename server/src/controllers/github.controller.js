const githubService = require('../services/github/github.service');

/**
 * @desc    Search GitHub users
 * @route   GET /api/github/users/search
 * @access  Private
 */
exports.searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Query parameter q is required'
      });
    }
    const items = await githubService.searchUsers(q);
    return res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    console.error('Error in searchUsers controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to search GitHub users'
    });
  }
};

/**
 * @desc    Get complete user profile
 * @route   GET /api/github/user/:username
 * @access  Private
 */
exports.getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username parameter is required'
      });
    }
    const profile = await githubService.getUserProfile(username);
    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error in getUserProfile controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to get GitHub user profile'
    });
  }
};

/**
 * @desc    Import repository (details, homepage/deploy link, and releases)
 * @route   GET /api/github/repository
 * @access  Private
 */
exports.getRepository = async (req, res, next) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and repo query parameters are required'
      });
    }

    const repoData = await githubService.getRepositoryInfo(owner, repo);
    
    // Fetch releases (Phase 3H)
    let releases = [];
    try {
      releases = await githubService.getReleases(owner, repo);
    } catch (e) {
      console.warn('Releases not available for this repository:', e.message);
    }

    const latestRelease = releases && releases.length > 0 ? {
      tagName: releases[0].tag_name,
      name: releases[0].name || releases[0].tag_name,
      publishedAt: releases[0].published_at,
      htmlUrl: releases[0].html_url
    } : null;

    // Fetch languages (Phase 3E)
    let languages = {};
    try {
      languages = await githubService.getLanguages(owner, repo);
    } catch (e) {
      console.warn('Languages not available for this repository:', e.message);
    }

    // Detect frameworks/technologies
    let detectedTechnologies = [];
    try {
      detectedTechnologies = await githubService.detectFrameworks(owner, repo, repoData.homepage);
    } catch (e) {
      console.warn('Framework detection not available:', e.message);
    }

    // Fetch contributors (Phase 3F)
    let contributors = [];
    try {
      contributors = await githubService.getContributors(owner, repo);
    } catch (e) {
      console.warn('Contributors not available for this repository:', e.message);
    }

    // Build statistics (Phase 3G)
    const stats = {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.watchers_count || repoData.subscribers_count || 0,
      openIssues: repoData.open_issues_count || 0,
      defaultBranch: repoData.default_branch || 'main',
      lastUpdated: repoData.updated_at
    };

    return res.status(200).json({
      success: true,
      data: {
        name: repoData.name,
        description: repoData.description || '',
        homepage: repoData.homepage || '', // Phase 3I: deploy link
        language: repoData.language || '',
        visibility: repoData.private ? 'private' : 'public',
        htmlUrl: repoData.html_url,
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
        stats,
        latestRelease, // Phase 3H: Releases
        languages,
        contributors,
        detectedTechnologies
      }
    });
  } catch (error) {
    console.error('Error in getRepository controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to fetch repository details'
    });
  }
};

/**
 * @desc    Import README
 * @route   GET /api/github/readme
 * @access  Private
 */
exports.getReadme = async (req, res, next) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and repo query parameters are required'
      });
    }
    const content = await githubService.getReadme(owner, repo);
    return res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error in getReadme controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to fetch repository README'
    });
  }
};

/**
 * @desc    Import contributors
 * @route   GET /api/github/contributors
 * @access  Private
 */
exports.getContributors = async (req, res, next) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and repo query parameters are required'
      });
    }
    const contributors = await githubService.getContributors(owner, repo);
    const formatted = contributors.map(c => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions
    }));
    return res.status(200).json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Error in getContributors controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to fetch repository contributors'
    });
  }
};

/**
 * @desc    Import repository languages
 * @route   GET /api/github/languages
 * @access  Private
 */
exports.getLanguages = async (req, res, next) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and repo query parameters are required'
      });
    }
    const languages = await githubService.getLanguages(owner, repo);
    return res.status(200).json({
      success: true,
      data: languages
    });
  } catch (error) {
    console.error('Error in getLanguages controller:', error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to fetch repository languages'
    });
  }
};
