import { getPoezieVersuri } from '../services/poezieService.js';
import logger from '../logger/logger.js';

export function poezieVersuri(req, res) {
    const { autor, id } = req.params;

    try {
        const rezultat = getPoezieVersuri(autor, id);

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
    const { autor, id } = req.params;

    try {
        const text = getPoezieText(autor, id);

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
