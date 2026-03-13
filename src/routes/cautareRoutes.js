// src/routes/cautareRoutes.js
import express from 'express';
import { validateRequest } from '../middleware/validation/validateRequest.js';
import { cautareSchema } from '../middleware/validation/schemas.js';
import { cautareTitlu } from '../controllers/cautareController.js';

const router = express.Router();

router.get(
    '/:autor/:titlu',
    validateRequest({ params: cautareSchema }),
    cautareTitlu
);

export default router;