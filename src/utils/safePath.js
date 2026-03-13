// src/utils/safePath.js
import path from 'path';
import logger from '../logger/logger.js';

export function safePath(filePath) {
    // Dacă calea începe cu "data/", o tratăm ca fiind relativă la proiect
    const projectRoot = process.cwd();

    const resolved = path.resolve(projectRoot, filePath);

    // Permitem doar acces în folderul "data"
    const dataDir = path.join(projectRoot, 'data');

    if (!resolved.startsWith(dataDir)) {
        logger.warn("Tentativă de acces la cale nepermisă", { filePath });
        throw new Error("Cale invalidă");
    }

    return resolved;
}