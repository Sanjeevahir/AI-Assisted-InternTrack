
const express = require("express");

const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

 const validateTask = require("../middleware/validateTask");

const router = express.Router();

// Create a new task
router.post("/", validateTask, createTask);

// Get all tasks
router.get("/", getAllTasks);

// Get a task by ID
router.get("/:id", getTaskById);

// Update a task
router.put("/:id", validateTask, updateTask);

// Delete a task
router.delete("/:id", deleteTask);

 module.exports = router;