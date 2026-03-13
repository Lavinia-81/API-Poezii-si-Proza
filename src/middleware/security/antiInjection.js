// src/middleware/security/antiInjection.js
import logger from '../../logger/logger.js';
import { AppError } from '../error/errorTypes.js';

const dangerousPatterns = [
    /\$where/i,
    /\$regex/i,
    /\$gt/i,
    /\$lt/i,
    /<script>/i,
    /<\/script>/i,
    /--/g,
    /;/g
];

export function antiInjection(req, res, next) {
    const allInputs = JSON.stringify({ params: req.params, query: req.query, body: req.body });

    for (const pattern of dangerousPatterns) {
        if (pattern.test(allInputs)) {
            logger.warn('Blocked suspicious input', {
                ip: req.ip,
                input: allInputs
            });

            throw new AppError('Input suspect detectat', 400, 'INJECTION_DETECTED');
        }
    }

    next();
}