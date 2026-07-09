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
      owner // owner field is ready for JWT auth later
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
    // 🎓 TEACHING MOMENT: Detailed Error Diagnostics for Audits
    console.error('=================== BACKEND ERROR DIAGNOSTICS ===================');
    console.error('Request Body:', JSON.stringify(req.body, null, 2));
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    if (error.stack) {
      console.error('Stack Trace:', error.stack);
    }
    console.error('=================================================================');

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
        message: `Invalid format for field: ${error.path}`,
        error: error.message
      });
    }

    // Handle duplicate key errors (e.g., Code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error: A resource with this value already exists.',
        error: error.keyValue
      });
    }

    // General fallback for unhandled server issues
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`
    });
  }
};

/**
 * @desc    Get all project workspaces
 * @route   GET /api/projects
 * @access  Public (Auth to be added later)
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(`Error inside getProjects controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not retrieve projects.'
    });
  }
};
