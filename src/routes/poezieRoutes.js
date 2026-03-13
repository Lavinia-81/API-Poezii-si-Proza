import express from 'express';
import { poezieVersuri, poezieText } from '../controllers/poezieController.js';
import { validateRequest } from '../middleware/validation/validateRequest.js';
import { idSchema } from '../middleware/validation/schemas.js';

const router = express.Router();

router.get('/:autor/:id/versuri', validateRequest({ params: idSchema }), poezieVersuri);

router.get('/:autor/:id/text', validateRequest({ params: idSchema }), poezieText);

export default router;