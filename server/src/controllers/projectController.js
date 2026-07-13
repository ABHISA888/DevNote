const Project = require('../models/Project');

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
    if (!deadline) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project deadline date is required'
      });
    }

    // Instantiating the Project document using the data
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
      deploymentUrl,
      startDate,
      deadline,
      reminderToggle,
      reminderDaysBefore,
      teamMembers,
      status,
      owner: req.user._id // Automatically assign owner from authenticated user
    });

    // Save to MongoDB Atlas
    const savedProject = await newProject.save();

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
