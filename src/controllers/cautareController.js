import { cautaDupaTitlu } from '../services/cautareService.js';
import { normalizeAutor } from "../utils/normalizeAutor.js";
import logger from '../logger/logger.js';

export function cautareTitlu(req, res) {
    const autorNormalizat = normalizeAutor(req.params.autor);
    const { titlu } = req.params;

    try {
        const rezultat = cautaDupaTitlu(autorNormalizat, titlu);

        if (rezultat === null) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        if (!rezultat.length) {
            return res.status(404).json({ mesaj: "Nimic găsit" });
        }

        res.json(rezultat);

    } catch (err) {
        logger.error("Eroare în controller cautareTitlu", { error: err.message });
        res.status(500).json({ mesaj: "Eroare internă" });
    }
}