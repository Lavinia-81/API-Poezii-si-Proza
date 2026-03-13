// src/controllers/poeziiController.js
import * as poeziiService from '../services/poeziiService.js';
import logger from '../logger/logger.js';

export function getAll(req, res) {
    try {
        const poezii = poeziiService.getAllPoezii();
        res.json(poezii);
    } catch (err) {
        logger.error('Eroare în controller getAll', { error: err.message });
        res.status(500).json({ mesaj: 'Eroare internă' });
    }
}

export function getById(req, res) {
    try {
        const { id } = req.params;
        const poezie = poeziiService.getPoezieById(id);

        if (!poezie) {
            return res.status(404).json({ mesaj: 'Poezia nu a fost găsită' });
        }

        res.json(poezie);
    } catch (err) {
        logger.error('Eroare în controller getById', { error: err.message });
        res.status(500).json({ mesaj: 'Eroare internă' });
    }
}