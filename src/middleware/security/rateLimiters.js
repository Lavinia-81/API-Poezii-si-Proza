// src/middleware/security/rateLimiters.js
import rateLimit from 'express-rate-limit';

export const strictLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { mesaj: 'Prea multe cereri. Încearcă mai târziu.' }
});

export const mediumLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: { mesaj: 'Prea multe cereri. Încearcă mai târziu.' }
});