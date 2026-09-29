const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI-Assisted InternTrack API is running",
        module: "Task Management",
        status: "healthy"
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AI-Assisted InternTrack Task Management API"
    });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;
