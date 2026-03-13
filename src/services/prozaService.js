// src/services/autorService.js
import { loadAutorData } from '../utils/loadAutorData.js';

export function getPoeziiAutor(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;
    return data.poezii || [];
}

export function getProzaAutor(autor) {
    const data = loadAutorData(autor);
    if (!data) return null;
    return data.proza || [];
}