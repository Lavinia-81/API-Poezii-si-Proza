// src/services/poeziiService.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../logger/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../../data/poezii');

export function getAllPoezii() {
    try {
        const files = fs.readdirSync(dataPath);
        const poezii = files
            .filter(f => f.endsWith('.json'))
            .map(f => JSON.parse(fs.readFileSync(path.join(dataPath, f), 'utf8')));

        return poezii;
    } catch (err) {
        logger.error('Eroare la citirea poeziilor', { error: err.message });
        throw new Error('Nu s-au putut încărca poeziile');
    }
}

export function getPoezieById(id) {
    try {
        const filePath = path.join(dataPath, `${id}.json`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        logger.error('Eroare la citirea poeziei', { id, error: err.message });
        throw new Error('Nu s-a putut încărca poezia');
    }
}