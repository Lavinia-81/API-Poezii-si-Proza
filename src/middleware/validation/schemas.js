// src/middleware/validation/schemas.js
import { z } from 'zod';


export const autorSchema = z.object({
    autor: z.string().min(1).max(50)
});


export const cautareSchema = z.object({
    autor: z.string().min(1).max(50),
    titlu: z.string().min(1).max(100)
});


export const idSchema = z.object({
    autor: z.string().min(1).max(50),
    id: z.string().min(1).max(50)
});
