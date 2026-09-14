const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.userId
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title,
        description,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};