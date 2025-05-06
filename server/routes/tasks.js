const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");
const router = express.Router();

// CREATE a task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy: req.userId // Assign the user ID who is creating the task
    });

    const savedTask = await newTask.save();

    await Notification.create({
      userId: assignedTo,
      message: `You have been assigned a new task: ${title}`
    })

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tasks created by or assigned to the user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ $or: [{ createdBy: req.userId }, { assignedTo: req.userId }] }); // Fetch tasks created by or assigned to the user
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

// UPDATE a task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, status, assignedTo },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
