import { loadAutorData } from '../utils/loadAutorData.js';

export function cautaDupaTitlu(autor, titlu) {
    const autorNormalizat = normalizeAutor(autor);

    const data = loadAutorData(autorNormalizat);
    if (!data) return null;

    const toate = [...data.poezii, ...data.proza];

    const rezultat = toate.filter(item =>
        item.titlu.toLowerCase().includes(titlu.toLowerCase())
    );

    return rezultat;
}