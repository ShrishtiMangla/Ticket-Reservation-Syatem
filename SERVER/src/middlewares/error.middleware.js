import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

    logger.error({
        message: err.message,
        stack: err.stack
    });

};