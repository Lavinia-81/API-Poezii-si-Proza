// src/utils/loadAutorData.js
import fs from 'fs';
import path from 'path';
import logger from '../logger/logger.js';
import { getDataFolder } from './getDataFolder.js';
import { safePath } from './safePath.js';
import { cache } from './cache.js';
import { normalizeAutor } from './normalizeAutor.js';

export function loadAutorData(autorRaw) {
    const folderName = normalizeAutor(autorRaw);
    const dataFolder = getDataFolder();
    if (!dataFolder) return null;

    // caching autor
    if (cache.autoriData.has(folderName)) {
        return cache.autoriData.get(folderName);
    }

    // citim toate folderele din /data
    const folders = fs.readdirSync(dataFolder);

    // găsim folderul care se potrivește indiferent de litere mari/mici
    const match = folders.find(f => f.toLowerCase() === folderName.toLowerCase());
    if (!match) return null;

    // calea corectă către folderul autorului
    const autorFolder = safePath(path.join(dataFolder, match));

    // găsim fișierul JSON din folder
    const jsonFile = fs.readdirSync(autorFolder).find(f => f.endsWith(".json"));
    if (!jsonFile) return null;

    // calea corectă către JSON
    const jsonPath = safePath(path.join(autorFolder, jsonFile));

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    // salvăm în cache
    cache.autoriData.set(folderName, data);

    return data;
}