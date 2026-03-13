import fs from 'fs';
import logger from '../logger/logger.js';
import { loadAutorData } from '../utils/loadAutorData.js';
import { safePath } from '../utils/safePath.js';
import { cache } from '../utils/cache.js';

export function getPoezieVersuri(autor, id) {
    const data = loadAutorData(autor);
    if (!data) return null;

    const poezie = data.poezii.find(p => p.id === id);
    if (!poezie) return false;

    const versuriPath = poezie.versuri_path;

    // caching
    if (cache.poezieText.has(versuriPath)) {
        return {
            id: poezie.id,
            titlu: poezie.titlu,
            tip: poezie.tip,
            continut: cache.poezieText.get(versuriPath)
        };
    }

    try {
        const filePath = safePath(versuriPath);
        const text = fs.readFileSync(filePath, 'utf-8');

        cache.poezieText.set(versuriPath, text);

        return {
            id: poezie.id,
            titlu: poezie.titlu,
            tip: poezie.tip,
            continut: text
        };

    } catch (err) {
        logger.error("Eroare la citirea versurilor", { error: err.message });
        throw new Error("Eroare la citirea versurilor");
    }
}


export function getPoezieText(autor, id) {
    const data = loadAutorData(autor);
    if (!data) return null;

    const poezie = data.poezii.find(p => p.id === id);
    if (!poezie) return false;

    const versuriPath = poezie.versuri_path;

    // caching
    if (cache.poezieText.has(versuriPath)) {
        return cache.poezieText.get(versuriPath);
    }

    try {
        const filePath = safePath(versuriPath);
        const text = fs.readFileSync(filePath, 'utf-8');

        cache.poezieText.set(versuriPath, text);

        return text;

    } catch (err) {
        logger.error("Eroare la citirea poeziei text", { error: err.message });
        throw new Error("Eroare la citirea poeziei");
    }
}
