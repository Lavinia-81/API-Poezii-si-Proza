// src/middleware/logging/requestLogger.js
import logger from '../../logger/logger.js';

export function requestLogger(req, res, next) {
    logger.info('Incoming request', {
        method: req.method,
        path: req.originalUrl,
        ip: req.ip
    });
    next();
}