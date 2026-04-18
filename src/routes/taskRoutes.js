import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all task routes
router.use(authMiddleware);

// POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      owner: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this task" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;