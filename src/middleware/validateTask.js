const { z } = require("zod");

const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Task title is required")
        .max(150, "Task title cannot exceed 150 characters"),

    description: z
        .string()
        .max(2000, "Description cannot exceed 2000 characters")
        .optional(),

    status: z
        .enum(["PLANNED", "IN_PROGRESS", "REVIEW", "COMPLETED"])
        .optional(),

    priority: z
        .enum(["LOW", "MEDIUM", "HIGH"])
        .optional(),

    assignee: z
        .string()
        .trim()
        .max(100, "Assignee cannot exceed 100 characters")
        .optional(),

    due_date: z
        .string()
        .date("Due date must be a valid date in YYYY-MM-DD format")
        .optional()
});

const validateTask = (req, res, next) => {
    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid task data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

 module.exports = validateTask;