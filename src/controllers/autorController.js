// src/controllers/autorController.js
import fs from 'fs';
import { safePath } from '../utils/safePath.js';
import logger from '../logger/logger.js';
import {
    getPoeziiAutor,
    getProzaAutor,
    getItemById,
    getBibliografieText,
    getPozaAutor
} from '../services/autorService.js';


export function poeziiAutor(req, res) {
    const { autor } = req.params;
    const data = getPoeziiAutor(autor);

    if (!data) return res.status(404).json({ mesaj: "Autorul nu există" });
    res.json(data);
}

export function prozaAutor(req, res) {
    const { autor } = req.params;
    const data = getProzaAutor(autor);

    if (!data) return res.status(404).json({ mesaj: "Autorul nu există" });
    res.json(data);
}

export function itemById(req, res) {
    const { autor, id } = req.params;
    const data = getItemById(autor, id);

    if (data === null) return res.status(404).json({ mesaj: "Autorul nu există" });
    if (data === false) return res.status(404).json({ mesaj: "Itemul nu a fost găsit" });

    res.json(data);
}

export function bibliografieText(req, res) {
    const { autor } = req.params;

    try {
        const text = getBibliografieText(autor);

        if (text === null) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        res.type('text/plain').send(text);

    } catch (err) {
        logger.error("Eroare în controller bibliografieText", { error: err.message });
        res.status(500).json({ mesaj: "Eroare la citirea bibliografiei" });
    }
}

export function pozaAutor(req, res) {
    const { autor } = req.params;

    try {
        const filePath = getPozaAutor(autor);

        if (filePath === null) {
            return res.status(404).json({ mesaj: "Autorul nu există" });
        }

        res.sendFile(filePath);

    } catch (err) {
        logger.error("Eroare în controller pozaAutor", { error: err.message });
        res.status(400).json({ mesaj: "Cale invalidă" });
    }
}


export function poezieText(req, res, next) {
    try {
        const { autor, id } = req.params;
        const item = getItemById(autor, id);

        if (!item) {
            return res.status(404).json({ mesaj: "Nu există acest ID" });
        }

        const filePath = safePath(item.versuri_path);
        const text = fs.readFileSync(filePath, 'utf8');

        res.json({ id, titlu: item.titlu, text });

    } catch (err) {
        next(err);
    }
}
