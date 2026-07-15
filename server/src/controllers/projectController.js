const Project = require('../models/Project');
const axios = require('axios');
const User = require('../models/User');
const TeamMember = require('../models/TeamMember');
const githubService = require('../services/github/github.service');

function parseGithubUrl(url) {
  if (!url) return null;
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }
  return null;
}

async function fetchReadme(owner, repo) {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DevNote-App'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
    if (res.data && res.data.content) {
      const decoded = Buffer.from(res.data.content, 'base64').toString('utf8');
      return decoded;
    }
  } catch (err) {
    console.error(`Failed to fetch README for ${owner}/${repo}:`, err.message);
  }
  return '';
}

/**
 * @desc    Create a new developer project workspace
 * @route   POST /api/projects
 * @access  Public (Auth to be added later)
 * 
 * 🎓 TEACHING MOMENT: Express Controller Request Lifecycle & Status Codes
 * 
 * 1. HTTP 201 Created: Used when a request succeeds and results in the creation of a new resource.
 *    Always return the newly created resource with its DB-generated ID and timestamps.
 * 2. HTTP 400 Bad Request: Indicates that the server cannot process the request due to client error
 *    (e.g., malformed request syntax, missing required fields, or validation failures).
 * 3. HTTP 500 Internal Server Error: Indicates that the server encountered an unexpected condition
 *    that prevented it from fulfilling the request (e.g., database connection loss, code crash).
 */
exports.createProject = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      visibility,
      isFavorite,
      templateId,
      themeColor,
      techStack,
      priority,
      estimatedDuration,
      githubUrl,
      figmaUrl,
      apiDocUrl,
      postmanUrl,
      deploymentUrl,
      startDate,
      deadline,
      reminderToggle,
      reminderDaysBefore,
      teamMembers,
      status,
      githubRelease,
      owner
    } = req.body;

    // 🎓 TEACHING MOMENT: Controller-Level Pre-validation (Fail-Fast Pattern)
    // While the database schema does validation, validating critical required fields in the controller
    // allows us to fail fast without incurring the overhead of database roundtrips.
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project name is required'
      });
    }
    if (!description || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project description is required'
      });
    }
    if (!category || category.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project category is required'
      });
    }
    if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Tech stack must be an array containing at least one technology'
      });
    }
    const isCompleted = status === 'Completed' || status === 'COMPLETED';
    if (!isCompleted && !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project deadline date is required'
      });
    }

    // Fetch readme & stats if githubUrl is supplied
    let readme = '';
    let fetchedStats = {};
    let fetchedDeploymentUrl = '';
    let fetchedRelease = null;

    let repositoryCreatedAt = null;
    let lastPushAt = null;
    let defaultBranch = 'main';
    let openIssues = 0;
    let stars = 0;
    let forks = 0;
    let watchers = 0;
    let primaryLanguage = '';
    let license = '';
    let ownerAvatar = '';
    let ownerName = '';

    let latestCommitDate = null;
    let latestCommitMessage = '';
    let latestCommitSha = '';

    if (githubUrl) {
      const githubInfo = parseGithubUrl(githubUrl);
      if (githubInfo) {
        readme = await fetchReadme(githubInfo.owner, githubInfo.repo);
        try {
          const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'DevNote-App'
          };
          if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
          }
          const repoRes = await axios.get(
            `https://api.github.com/repos/${encodeURIComponent(githubInfo.owner)}/${encodeURIComponent(githubInfo.repo)}`,
            { headers }
          );
          
          repositoryCreatedAt = repoRes.data.created_at;
          lastPushAt = repoRes.data.pushed_at;
          defaultBranch = repoRes.data.default_branch || 'main';
          openIssues = repoRes.data.open_issues_count || 0;
          stars = repoRes.data.stargazers_count || 0;
          forks = repoRes.data.forks_count || 0;
          watchers = repoRes.data.watchers_count || repoRes.data.subscribers_count || 0;
          primaryLanguage = repoRes.data.language || '';
          license = repoRes.data.license?.name || repoRes.data.license?.spdx_id || '';
          ownerAvatar = repoRes.data.owner?.avatar_url || '';
          ownerName = repoRes.data.owner?.login || '';

          fetchedStats = {
            stars: stars,
            forks: forks,
            openIssues: openIssues,
            watchers: watchers,
            defaultBranch: defaultBranch,
            lastUpdated: repoRes.data.updated_at
          };

          // Phase 3I: deploy link from homepage
          if (repoRes.data.homepage) {
            fetchedDeploymentUrl = repoRes.data.homepage;
          }

          // Fetch latest commit
          try {
            const commitsRes = await axios.get(
              `https://api.github.com/repos/${encodeURIComponent(githubInfo.owner)}/${encodeURIComponent(githubInfo.repo)}/commits`,
              { headers }
            );
            if (commitsRes.data && commitsRes.data.length > 0) {
              const latestCommit = commitsRes.data[0];
              latestCommitDate = latestCommit.commit?.author?.date || latestCommit.commit?.committer?.date || null;
              latestCommitMessage = latestCommit.commit?.message || '';
              latestCommitSha = latestCommit.sha || '';
            }
          } catch (commitErr) {
            console.error('Failed to auto-fetch commits during creation:', commitErr.message);
          }

          // Phase 3H: fetch releases
          try {
            const releasesRes = await axios.get(
              `https://api.github.com/repos/${encodeURIComponent(githubInfo.owner)}/${encodeURIComponent(githubInfo.repo)}/releases`,
              { headers }
            );
            if (releasesRes.data && releasesRes.data.length > 0) {
              fetchedRelease = {
                tagName: releasesRes.data[0].tag_name,
                name: releasesRes.data[0].name || releasesRes.data[0].tag_name,
                publishedAt: releasesRes.data[0].published_at,
                htmlUrl: releasesRes.data[0].html_url
              };
            }
          } catch (relErr) {
            console.error('Failed to auto-fetch releases during creation:', relErr.message);
          }

        } catch (err) {
          console.error('Failed to auto-fetch stats during creation:', err.message);
        }
      }
    }

    // Instantiating the Project document using the data
    const resolvedStartDate = (isCompleted && repositoryCreatedAt) 
      ? repositoryCreatedAt 
      : (startDate && startDate.trim() !== '' ? new Date(startDate) : undefined);
      
    const resolvedDeadline = (isCompleted && (latestCommitDate || lastPushAt))
      ? (latestCommitDate || lastPushAt)
      : (deadline && deadline.trim() !== '' ? new Date(deadline) : undefined);

    const newProject = new Project({
      name,
      description,
      category,
      visibility,
      isFavorite,
      templateId,
      themeColor,
      techStack,
      priority,
      estimatedDuration,
      githubUrl,
      figmaUrl,
      apiDocUrl,
      postmanUrl,
      deploymentUrl: deploymentUrl || fetchedDeploymentUrl,
      startDate: resolvedStartDate,
      deadline: resolvedDeadline,
      reminderToggle,
      reminderDaysBefore,
      teamMembers,
      status,
      readme,
      githubStats: req.body.githubStats || fetchedStats,
      githubRelease: req.body.githubRelease || fetchedRelease,
      repositoryCreatedAt,
      lastPushAt,
      defaultBranch,
      openIssues,
      stars,
      forks,
      watchers,
      primaryLanguage,
      license,
      ownerAvatar,
      ownerName,
      latestCommitDate,
      latestCommitMessage,
      latestCommitSha,
      owner: req.user._id // Automatically assign owner from authenticated user
    });

    // Save to MongoDB Atlas
    const savedProject = await newProject.save();

    // Create TeamMember documents if teamMembers are passed in the creation payload
    if (teamMembers && Array.isArray(teamMembers)) {
      for (const tm of teamMembers) {
        try {
          if (!tm.githubUsername) continue;
          
          const fallbackEmail = `${tm.githubUsername.toLowerCase()}@github.tmp`;
          let user = await User.findOne({ email: fallbackEmail });
          if (!user) {
            user = await User.create({
              name: tm.displayName || tm.githubUsername,
              email: fallbackEmail,
              avatar: tm.githubAvatar,
              provider: 'local',
              password: Math.random().toString(36).slice(-10) + 'A1!',
              role: 'user'
            });
          }
          await TeamMember.create({
            project: savedProject._id,
            user: user._id,
            githubUsername: tm.githubUsername,
            githubAvatar: tm.githubAvatar,
            githubUrl: tm.githubUrl || `https://github.com/${tm.githubUsername}`,
            displayName: tm.displayName || tm.githubUsername,
            role: tm.role || 'Viewer'
          });
        } catch (err) {
          console.error('Failed to seed team member during project creation:', err.message);
        }
      }
    }

    // Send successful response with 201 Created status code
    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: savedProject
    });

  } catch (error) {
    console.error(`Error inside createProject controller: ${error.message}`);

    // Handle Mongoose Validation Error (built-in validation rules)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    // Handle Mongoose Cast Error (e.g. invalid object ID format or malformed dates)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field: ${error.path}`
      });
    }

    // General fallback for unhandled server issues
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Something went wrong on our end.'
    });
  }
};

/**
 * @desc    Get all developer projects for the logged-in user
 * @route   GET /api/projects
 * @access  Private
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(`Error inside getProjects controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Something went wrong on our end.'
    });
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Private
 */
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email avatar');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Verify owner
    const ownerId = project.owner._id ? project.owner._id.toString() : project.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    return res.status(200).json({
      success: true,
      project: project,
      data: project,
    });
  } catch (error) {
    console.error(`Error inside getProjectById controller: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Verify owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    // Prevent modifying the owner field manually
    delete req.body.owner;

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    console.error(`Error inside updateProject controller: ${error.message}`);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Verify owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error(`Error inside deleteProject controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    Pin/Unpin a project
 * @route   PATCH /api/projects/:id/pin
 * @access  Private
 */
exports.pinProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Verify owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    project.isPinned = !project.isPinned;
    await project.save();

    return res.status(200).json({
      success: true,
      message: `Project ${project.isPinned ? 'pinned' : 'unpinned'} successfully`,
      data: project,
    });
  } catch (error) {
    console.error(`Error inside pinProject controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    Favorite/Unfavorite a project
 * @route   PATCH /api/projects/:id/favorite
 * @access  Private
 */
exports.favoriteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Verify owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    project.isFavorite = !project.isFavorite;
    await project.save();

    return res.status(200).json({
      success: true,
      message: `Project ${project.isFavorite ? 'favorited' : 'unfavorited'} successfully`,
      data: project,
    });
  } catch (error) {
    console.error(`Error inside favoriteProject controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc    Get repository details from GitHub
 * @route   GET /api/projects/github/repo
 * @access  Private
 */
exports.getGithubRepoInfo = async (req, res, next) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and Repo query parameters are required'
      });
    }

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DevNote-App'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    let repoData = {};
    let languages = {};
    let contributors = [];

    try {
      const repoRes = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, { headers });
      repoData = repoRes.data;
    } catch (err) {
      console.error('Error fetching basic repo info:', err.message);
      return res.status(err.response?.status || 500).json({
        success: false,
        message: err.response?.data?.message || 'Failed to fetch repository details from GitHub'
      });
    }

    try {
      const langRes = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`, { headers });
      languages = langRes.data || {};
    } catch (err) {
      console.error('Error fetching repo languages:', err.message);
    }

    try {
      const contribRes = await axios.get(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors`, { headers });
      contributors = (contribRes.data || []).map(c => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        contributions: c.contributions
      }));
    } catch (err) {
      console.error('Error fetching repo contributors:', err.message);
    }

    // Detect frameworks/technologies
    let detectedTechnologies = [];
    try {
      detectedTechnologies = await githubService.detectFrameworks(owner, repo, repoData.homepage);
    } catch (e) {
      console.warn('Framework detection not available:', e.message);
    }

    return res.status(200).json({
      success: true,
      data: {
        name: repoData.name,
        description: repoData.description || '',
        homepage: repoData.homepage || '',
        language: repoData.language || '',
        visibility: repoData.private ? 'private' : 'public',
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        watchers: repoData.watchers_count || repoData.subscribers_count || 0,
        openIssues: repoData.open_issues_count || 0,
        defaultBranch: repoData.default_branch || 'main',
        topics: repoData.topics || [],
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
        htmlUrl: repoData.html_url,
        languages,
        contributors,
        detectedTechnologies
      }
    });
  } catch (error) {
    console.error('Error fetching github repo info:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch repository details from GitHub'
    });
  }
};

/**
 * @desc    Get project README content
 * @route   GET /api/projects/:id/readme
 * @access  Private
 */
exports.getProjectReadme = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Verify owner
    const ownerId = project.owner._id ? project.owner._id.toString() : project.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not own this project',
      });
    }

    if (project.readme) {
      return res.status(200).json({
        success: true,
        readme: project.readme
      });
    }

    // Fetch dynamically if githubUrl exists but readme is empty
    if (project.githubUrl) {
      const githubInfo = parseGithubUrl(project.githubUrl);
      if (githubInfo) {
        const readmeText = await fetchReadme(githubInfo.owner, githubInfo.repo);
        if (readmeText) {
          project.readme = readmeText;
          await project.save();
          return res.status(200).json({
            success: true,
            readme: readmeText
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      readme: ''
    });
  } catch (error) {
    console.error('Error getting project readme:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
