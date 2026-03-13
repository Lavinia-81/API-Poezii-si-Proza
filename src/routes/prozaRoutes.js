// src/routes/prozaRoutes.js
import express from 'express';
import * as prozaController from '../controllers/prozaController.js';

const router = express.Router();

router.get('/', prozaController.getAll);
router.get('/:id', prozaController.getById);

export default router;