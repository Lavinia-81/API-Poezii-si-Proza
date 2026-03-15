// src/controllers/prozaController.js
import { getPoeziiAutor, getProzaAutor } from '../services/autorService.js';
import { normalizeAutor } from "../utils/normalizeAutor.js";
import logger from '../logger/logger.js';

export function poeziiAutor(req, res) {
    const autorNormalizat = normalizeAutor(req.params.autor);

    try {
        const poezii = getPoeziiAutor(autorNormalizat);

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
    const autorNormalizat = normalizeAutor(req.params.autor);

    try {
        const proza = getProzaAutor(autorNormalizat);

        if (!proza) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        res.json(proza);
    } catch (err) {
        logger.error("Eroare în controller prozaAutor", { error: err.message });
        res.status(500).json({ mesaj: "Eroare internă" });
    }
}