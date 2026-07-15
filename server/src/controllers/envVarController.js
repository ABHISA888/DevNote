const EnvVar = require('../models/EnvVar');
const Project = require('../models/Project');

// Get all environment variables for a project
exports.getEnvVars = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const variables = await EnvVar.find({ project: projectId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: variables
    });
  } catch (err) {
    next(err);
  }
};

// Create a new environment variable
exports.createEnvVar = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { key, value, description, environment, isSecret } = req.body;

    if (!key || !value || !environment) {
      return res.status(400).json({
        success: false,
        message: 'Key, Value, and Environment are required'
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check for duplicate key in this environment
    const duplicate = await EnvVar.findOne({
      project: projectId,
      environment,
      key: key.trim()
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: `Variable with key "${key.trim()}" already exists in the "${environment}" environment.`
      });
    }

    const envVar = new EnvVar({
      project: projectId,
      key: key.trim(),
      value: value.trim(),
      description: description || '',
      environment,
      isSecret: !!isSecret,
      createdBy: req.user._id
    });

    const savedVar = await envVar.save();

    res.status(201).json({
      success: true,
      data: savedVar
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A duplicate environment variable key exists for this environment.'
      });
    }
    next(err);
  }
};

// Update an environment variable
exports.updateEnvVar = async (req, res, next) => {
  try {
    const { envVarId } = req.params;
    const { key, value, description, environment, isSecret } = req.body;

    let envVar = await EnvVar.findById(envVarId);
    if (!envVar) {
      return res.status(404).json({
        success: false,
        message: 'Environment variable not found'
      });
    }

    if (key !== undefined) envVar.key = key.trim();
    if (value !== undefined) envVar.value = value.trim();
    if (description !== undefined) envVar.description = description;
    if (environment !== undefined) envVar.environment = environment;
    if (isSecret !== undefined) envVar.isSecret = isSecret;

    // Check for duplicate key on update if key or environment changed
    if (key !== undefined || environment !== undefined) {
      const duplicate = await EnvVar.findOne({
        _id: { $ne: envVarId },
        project: envVar.project,
        environment: envVar.environment,
        key: envVar.key
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Variable with key "${envVar.key}" already exists in the "${envVar.environment}" environment.`
        });
      }
    }

    const updatedVar = await envVar.save();

    res.status(200).json({
      success: true,
      data: updatedVar
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A duplicate environment variable key exists for this environment.'
      });
    }
    next(err);
  }
};

// Delete an environment variable
exports.deleteEnvVar = async (req, res, next) => {
  try {
    const { envVarId } = req.params;

    const envVar = await EnvVar.findById(envVarId);
    if (!envVar) {
      return res.status(404).json({
        success: false,
        message: 'Environment variable not found'
      });
    }

    await EnvVar.deleteOne({ _id: envVarId });

    res.status(200).json({
      success: true,
      message: 'Environment variable deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
