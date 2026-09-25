const express = require("express");
const { createTask, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const validateTask = require("../middleware/validateTask");
const pool = require("../db/pool");

const router = express.Router();

router.post("/", validateTask, createTask);

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
        res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch tasks" });
    }
});

router.get("/:id", getTaskById);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
