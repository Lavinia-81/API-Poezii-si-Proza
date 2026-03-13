// src/controllers/poetiController.js
import { getListaPoeti } from '../services/poetiService.js';
import logger from '../logger/logger.js';

export function listaPoeti(req, res) {
    try {
        const autori = getListaPoeti();
        res.json(autori);
    } catch (err) {
        logger.error("Eroare în controller listaPoeti", { error: err.message });
        res.status(500).json({ mesaj: "Eroare internă" });
    }
}