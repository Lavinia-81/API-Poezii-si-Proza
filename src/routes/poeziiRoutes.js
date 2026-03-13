// src/routes/poeziiRoutes.js
import express from 'express';
import * as poeziiController from '../controllers/poeziiController.js';

const router = express.Router();

router.get('/', poeziiController.getAll);
router.get('/:id', poeziiController.getById);

export default router;