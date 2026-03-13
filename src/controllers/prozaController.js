// src/controllers/autorController.js
import { getPoeziiAutor, getProzaAutor } from '../services/autorService.js';
import logger from '../logger/logger.js';

export function poeziiAutor(req, res) {
    const { autor } = req.params;

    try {
        const poezii = getPoeziiAutor(autor);

        if (!poezii) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        res.json(poezii);
    } catch (err) {
        logger.error("Eroare în controller poeziiAutor", { error: err.message });
        res.status(500).json({ mesaj: "Eroare internă" });
    }
}

export function prozaAutor(req, res) {
    const { autor } = req.params;

    try {
        const proza = getProzaAutor(autor);

        if (!proza) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        res.json(proza);
    } catch (err) {
        logger.error("Eroare în controller prozaAutor", { error: err.message });
        res.status(500).json({ mesaj: "Eroare internă" });
    }
}