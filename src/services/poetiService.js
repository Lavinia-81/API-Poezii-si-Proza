// src/services/poetiService.js
import fs from 'fs';
import path from 'path';
import logger from '../logger/logger.js';
import { getDataFolder } from '../utils/getDataFolder.js';
import { cache } from '../utils/cache.js';

export function getListaPoeti() {
    const dataFolder = getDataFolder();

    if (!dataFolder) {
        throw new Error("Folderul 'data' nu există");
    }

    // caching
    if (cache.autoriList) {
        return cache.autoriList;
    }

    try {
        const autori = fs.readdirSync(dataFolder).filter(f =>
            fs.lstatSync(path.join(dataFolder, f)).isDirectory()
        );

        cache.autoriList = autori;
        return autori;

    } catch (err) {
        logger.error("Eroare la citirea listei de poeți", { error: err.message });
        throw new Error("Nu s-a putut încărca lista de poeți");
    }
}