// src/logger/logger.js
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/config.js';

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

const devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
        return `${timestamp} [${level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
);

// Transport pentru loguri generale
const appTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d'
});

// Transport pentru erori
const errorTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d'
});

// Transport pentru securitate
const securityTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/security-%DATE%.log',
    level: 'warn',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '60d'
});

const logger = winston.createLogger({
    level: 'info',
    format: config.env === 'production' ? logFormat : devFormat,
    transports: [
        appTransport,
        errorTransport,
        securityTransport,
        new winston.transports.Console()
    ]
});

export default logger;