// src/routes/poetiRoutes.js
import express from 'express';
import { listaPoeti } from '../controllers/poetiController.js';

const router = express.Router();

router.get('/', listaPoeti);

export default router;