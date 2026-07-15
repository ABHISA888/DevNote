const Note = require('../models/Note');
const Project = require('../models/Project');

// Get all notes for a project
exports.getNotes = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const notes = await Note.find({ project: projectId })
      .sort({ isPinned: -1, updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (err) {
    next(err);
  }
};

// Create a new note for a project
exports.createNote = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, content, tags } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const note = new Note({
      project: projectId,
      title: title || '',
      content: content || '',
      tags: tags || [],
      owner: req.user._id
    });

    const savedNote = await note.save();

    res.status(201).json({
      success: true,
      data: savedNote
    });
  } catch (err) {
    next(err);
  }
};

// Update a note
exports.updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, isPinned, isArchived, tags } = req.body;

    let note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;
    if (tags !== undefined) note.tags = tags;

    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      data: updatedNote
    });
  } catch (err) {
    next(err);
  }
};

// Delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    await Note.deleteOne({ _id: noteId });

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
