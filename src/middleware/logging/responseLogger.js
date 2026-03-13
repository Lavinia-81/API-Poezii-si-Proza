// src/middleware/logging/responseLogger.js
import logger from '../../logger/logger.js';

export function responseLogger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        logger.info('Response sent', {
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`
        });
    });

    next();
}