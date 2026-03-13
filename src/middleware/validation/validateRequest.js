// src/middleware/validation/validateRequest.js
import { AppError } from '../error/errorTypes.js';

export function validateRequest(schemas) {
    return (req, res, next) => {
        try {
            if (schemas.params) {
                schemas.params.parse({ ...req.params });
            }

            if (schemas.query) {
                schemas.query.parse({ ...req.query });
            }

            if (schemas.body) {
                schemas.body.parse({ ...req.body });
            }

            next();

        } catch (err) {
            throw new AppError('Date invalide', 400, 'VALIDATION_ERROR');
        }
    };
}