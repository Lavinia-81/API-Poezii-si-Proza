// src/middleware/error/errorHandler.js
import { AppError } from './errorTypes.js';
import logger from '../../logger/logger.js';
import crypto from 'crypto';

export function errorHandler(err, req, res, next) {
    const trackingId = crypto.randomUUID();

    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : 'Eroare internă';
    const internalCode = err instanceof AppError ? err.internalCode : 'INTERNAL_ERROR';

    logger.error('Error caught by global handler', {
        trackingId,
        internalCode,
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    res.status(status).json({
        mesaj: message,
        cod: internalCode,
        trackingId
    });
}