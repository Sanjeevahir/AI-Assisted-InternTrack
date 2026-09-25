const { z } = require("zod");

const taskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required").max(150),
    description: z.string().optional(),
    status: z.enum(["PLANNED", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    assignee: z.string().max(100).optional(),
    due_date: z.string().optional()
});

const validateTask = (req, res, next) => {
    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid task data",
            errors: result.error.errors
        });
    }

    req.body = result.data;
    next();
};

module.exports = validateTask;
