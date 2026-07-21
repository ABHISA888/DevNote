const Task = require('../models/Task');
const Project = require('../models/Project');
const mongoose = require('mongoose');

/**
 * 🎓 TEACHING MOMENT: Express Async Controllers & Authorization Checks
 * 
 * In multi-tenant SaaS applications, authorization must occur at the controller level:
 * 1. Verify resource existence (404 Not Found).
 * 2. Verify user permission over the parent entity (Project) (403 Forbidden).
 * 3. Fail fast on bad user input (400 Bad Request).
 * 4. Execute atomic database queries using Mongoose and async/await.
 * 5. Return standardized JSON envelopes ({ success, message, data }).
 */

/**
 * @desc    Get all tasks for the logged-in user across all projects
 * @route   GET /api/tasks
 * @access  Private
 */
exports.getTasks = async (req, res, next) => {
  try {
    const filter = { isArchived: false };

    if (req.query.projectId) {
      if (mongoose.Types.ObjectId.isValid(req.query.projectId)) {
        filter.project = req.query.projectId;
      }
    } else {
      // Find projects owned by user to populate user's tasks
      const userProjects = await Project.find({ owner: req.user._id }).select('_id');
      const projectIds = userProjects.map((p) => p._id);
      filter.$or = [{ user: req.user._id }, { project: { $in: projectIds } }];
    }

    const tasks = await Task.find(filter)
      .populate('project', 'name themeColor category')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(`Error in getTasks controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not fetch tasks.',
    });
  }
};

/**
 * @desc    Create a new task for a project
 * @route   POST /api/tasks
 * @access  Private
 */
exports.createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      project: projectId,
      assignedTo,
      startDate,
      dueDate,
      estimatedHours,
      actualHours,
      labels,
      attachments,
      progress,
      githubUsername,
      githubAvatar,
      githubProfile,
    } = req.body;

    // Fail-Fast Validation: Title and Project are required
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Task title is required.',
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Project ID is required.',
      });
    }

    // Verify valid MongoDB ObjectId format for project
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format.',
      });
    }

    // Check if the parent Project exists
    const parentProject = await Project.findById(projectId);
    if (!parentProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Authorization Check: Verify the logged-in user owns the project
    const ownerId = parentProject.owner._id
      ? parentProject.owner._id.toString()
      : parentProject.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not have permission to add tasks to this project.',
      });
    }

    // Validate enum values if provided
    const validStatuses = ['Todo', 'In Progress', 'Review', 'Completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${status} is not a valid status. Valid statuses are: ${validStatuses.join(', ')}`,
      });
    }

    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${priority} is not a valid priority. Valid priorities are: ${validPriorities.join(', ')}`,
      });
    }

    // Construct task document
    const newTask = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Todo',
      priority: priority || 'Medium',
      project: projectId,
      user: req.user._id,
      createdBy: req.user._id,
      assignedTo: assignedTo || null,
      startDate: startDate || null,
      dueDate: dueDate || null,
      estimatedHours: estimatedHours || 0,
      actualHours: actualHours || 0,
      labels: Array.isArray(labels) ? labels : [],
      attachments: Array.isArray(attachments) ? attachments : [],
      progress: typeof progress === 'number' ? progress : (status === 'Completed' ? 100 : 0),
      githubUsername: githubUsername || '',
      githubAvatar: githubAvatar || '',
      githubProfile: githubProfile || '',
    });

    const savedTask = await newTask.save();
    const populatedTask = await Task.findById(savedTask._id).populate('project', 'name themeColor category').lean();

    return res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: populatedTask || savedTask,
    });
  } catch (error) {
    console.error(`Error in createTask controller: ${error.message}`);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field: ${error.path}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not create task.',
    });
  }
};

/**
 * @desc    Get all tasks for a specific project
 * @route   GET /api/tasks/project/:projectId
 * @access  Private
 */
exports.getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format.',
      });
    }

    // Verify parent project exists
    const parentProject = await Project.findById(projectId);
    if (!parentProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Authorization Check
    const ownerId = parentProject.owner._id
      ? parentProject.owner._id.toString()
      : parentProject.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not have permission to view tasks for this project.',
      });
    }

    // 🎓 TEACHING MOMENT: Mongoose Performance Optimization with .lean()
    // Using .lean() converts Mongoose Documents into plain JavaScript objects, skipping hydrated getters/setters.
    // This reduces memory overhead and improves response latency for read endpoints.
    const tasks = await Task.find({ project: projectId, isArchived: false })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(`Error in getProjectTasks controller: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not fetch project tasks.',
    });
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:taskId
 * @access  Private
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }

    // Find task and populate assignedTo & createdBy user details
    const task = await Task.findById(taskId)
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email avatar')
      .lean();

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    // Verify parent project permission
    const parentProject = await Project.findById(task.project);
    if (!parentProject) {
      return res.status(404).json({
        success: false,
        message: 'Parent project not found.',
      });
    }

    const ownerId = parentProject.owner._id
      ? parentProject.owner._id.toString()
      : parentProject.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not have permission to view this task.',
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(`Error in getTaskById controller: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not retrieve task.',
    });
  }
};

/**
 * @desc    Update a task by ID
 * @route   PUT /api/tasks/:taskId
 * @access  Private
 */
exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    // Verify parent project ownership
    const parentProject = await Project.findById(task.project);
    if (!parentProject) {
      return res.status(404).json({
        success: false,
        message: 'Parent project not found.',
      });
    }

    const ownerId = parentProject.owner._id
      ? parentProject.owner._id.toString()
      : parentProject.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not have permission to update tasks for this project.',
      });
    }

    // Validate enum fields if updated
    if (req.body.status) {
      const validStatuses = ['Todo', 'In Progress', 'Review', 'Completed'];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          message: `Validation Error: ${req.body.status} is not a valid status. Valid statuses are: ${validStatuses.join(', ')}`,
        });
      }
    }

    if (req.body.priority) {
      const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
      if (!validPriorities.includes(req.body.priority)) {
        return res.status(400).json({
          success: false,
          message: `Validation Error: ${req.body.priority} is not a valid priority. Valid priorities are: ${validPriorities.join(', ')}`,
        });
      }
    }

    // Prevent modifying the parent project or creator fields
    delete req.body.project;
    delete req.body.user;
    delete req.body.createdBy;

    // Apply updates and trigger Mongoose validators & pre-save hooks
    Object.assign(task, req.body);
    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      data: updatedTask,
    });
  } catch (error) {
    console.error(`Error in updateTask controller: ${error.message}`);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid format for field: ${error.path}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not update task.',
    });
  }
};

/**
 * @desc    Delete a task by ID
 * @route   DELETE /api/tasks/:taskId
 * @access  Private
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    // Verify parent project ownership
    const parentProject = await Project.findById(task.project);
    if (!parentProject) {
      return res.status(404).json({
        success: false,
        message: 'Parent project not found.',
      });
    }

    const ownerId = parentProject.owner._id
      ? parentProject.owner._id.toString()
      : parentProject.owner.toString();
    if (ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access Forbidden: You do not have permission to delete tasks for this project.',
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    console.error(`Error in deleteTask controller: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not delete task.',
    });
  }
};
