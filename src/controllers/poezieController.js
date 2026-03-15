import { getPoezieVersuri } from '../services/poezieService.js';
import { normalizeAutor } from "../utils/normalizeAutor.js";
import logger from '../logger/logger.js';

export function poezieVersuri(req, res) {
    const autorNormalizat = normalizeAutor(req.params.autor);
    const { id } = req.params;

    try {
        const rezultat = getPoezieVersuri(autorNormalizat, id);

        if (rezultat === null) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        if (rezultat === false) {
            return res.status(404).json({ mesaj: "Poezia nu a fost găsită" });
        }

        res.json(rezultat);

    } catch (err) {
        logger.error("Eroare în controller poezieVersuri", { error: err.message });
        res.status(500).json({ mesaj: "Eroare la citirea versurilor" });
    }
}

export function poezieText(req, res) {
    const autorNormalizat = normalizeAutor(req.params.autor);
    const { id } = req.params;

    try {
        const text = getPoezieText(autorNormalizat, id);

        if (text === null) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        if (text === false) {
            return res.status(404).json({ mesaj: "Poezia nu a fost găsită" });
        }

        res.type('text/plain').send(text);

    } catch (err) {
        logger.error("Eroare în controller poezieText", { error: err.message });
        res.status(500).json({ mesaj: "Eroare la citirea poeziei" });
    }
}
