// src/utils/getDataFolder.js
import fs from 'fs';
import path from 'path';
import logger from '../logger/logger.js';

export function getDataFolder() {
    const dataPath = path.join(process.cwd(), 'data');

    if (!fs.existsSync(dataPath)) {
        logger.error("Folderul 'data' nu există");
        return null;
    }

    return dataPath;
}