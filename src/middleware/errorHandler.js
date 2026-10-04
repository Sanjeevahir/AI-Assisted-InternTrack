
const errorHandler = (err, req, res, next) => {
    console.error("Request failed:", err.message);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message:
            err.statusCode && err.statusCode < 500
                ? err.message
                : "Internal server error"
    });
};

module.exports = errorHandler;