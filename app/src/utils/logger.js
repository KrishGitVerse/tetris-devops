/**
 * logger.js — Centralized logging utility
 *
 * WHY: In production, you need structured logs that can be:
 *   - Searched (find all errors in last hour)
 *   - Aggregated (sent to Elasticsearch, CloudWatch, etc.)
 *   - Correlated (trace a request through multiple services)
 *
 * Winston gives us log levels: error > warn > info > debug
 * In production, we set level to 'info' to avoid debug noise
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logDir = process.env.LOG_FILE
  ? path.dirname(process.env.LOG_FILE)
  : 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()  // Structured JSON logs — easier to parse
);

// Console format (human-readable for development)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level}: ${message} ${metaStr}`;
  })
);

const transports = [
  // Always log to console
  new winston.transports.Console({
    format: consoleFormat,
    level: process.env.LOG_LEVEL || 'info',
  }),
];

// In non-test environments, also log to files
if (process.env.NODE_ENV !== 'test') {
  transports.push(
    // All logs
    new winston.transports.File({
      filename: process.env.LOG_FILE || 'logs/app.log',
      format: logFormat,
      level: process.env.LOG_LEVEL || 'info',
      maxsize: 5242880,  // 5MB — rotate after this size
      maxFiles: 5,       // Keep last 5 rotated files
    }),
    // Errors get their own file for easy monitoring
    new winston.transports.File({
      filename: 'logs/error.log',
      format: logFormat,
      level: 'error',
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports,
  // Don't crash on uncaught exceptions — log them instead
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
});

module.exports = logger;