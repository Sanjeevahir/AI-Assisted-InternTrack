const pool = require("../db/pool");

const createTask = async (req, res) => {
    try {
        const { title, description, status = "PLANNED", priority = "MEDIUM", assignee, due_date } = req.body;
        const result = await pool.query(
            `INSERT INTO tasks (title, description, status, priority, assignee, due_date)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, description || null, status, priority, assignee || null, due_date || null]
        );
        res.status(201).json({ success: true, message: "Task created successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create task" });
    }
};

const getTaskById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch task" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, assignee, due_date } = req.body;
        const result = await pool.query(
            `UPDATE tasks
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 status = COALESCE($3, status),
                 priority = COALESCE($4, priority),
                 assignee = COALESCE($5, assignee),
                 due_date = COALESCE($6, due_date),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $7 RETURNING *`,
            [title, description, status, priority, assignee, due_date, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task updated successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING id", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete task" });
    }
};

module.exports = { createTask, getTaskById, updateTask, deleteTask };
