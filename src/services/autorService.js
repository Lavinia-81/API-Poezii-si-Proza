// src/services/autorService.js
import fs from 'fs';
import path from 'path';
import logger from '../logger/logger.js';
import { loadAutorData } from '../utils/loadAutorData.js';
import { safePath } from '../utils/safePath.js';
import { cache } from '../utils/cache.js';


// Poeziile unui autor
export function getPoeziiAutor(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;

    return data.poezii || [];
}

// Proza unui autor
export function getProzaAutor(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;

    return data.proza || [];
}

// Item după ID (poezie sau proză)
export function getItemById(autor, id) {
    const data = loadAutorData(autor);
    if (!data) return null;

    const toate = [...data.poezii, ...data.proza];
    const item = toate.find(p => p.id === id);

    return item || false; // false = autor există, dar ID-ul nu
}

// Bibliografia unui autor
export function getBibliografieText(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;

    const biblioPath = data.bibliografie_path;

    // caching
    if (cache.bibliografieText.has(biblioPath)) {
        return cache.bibliografieText.get(biblioPath);
    }

    try {
        const filePath = safePath(biblioPath);
        const text = fs.readFileSync(filePath, 'utf-8');

        cache.bibliografieText.set(biblioPath, text);

        return text;

    } catch (err) {
        logger.error("Eroare la citirea bibliografiei", { error: err.message });
        throw new Error("Eroare la citirea bibliografiei");
    }
}

// Poza (fotografia) unui autor
export function getPozaAutor(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;

    try {
        const filePath = safePath(data.poza);
        return filePath;
    } catch (err) {
        logger.warn("Cale invalidă la poza autorului", { error: err.message });
        throw new Error("Cale invalidă");
    }
}
