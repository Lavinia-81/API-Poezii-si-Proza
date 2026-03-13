// src/middleware/error/errorTypes.js

export class AppError extends Error {
    constructor(message, statusCode = 500, internalCode = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.internalCode = internalCode;
    }
}