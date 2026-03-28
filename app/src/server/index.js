require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;
const APP_NAME = process.env.APP_NAME || 'tetris-devops';
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const START_TIME = Date.now();

let requestCount = 0;
let errorCount = 0;

// ===========================
// Find the build directory
// ===========================
// Try multiple possible locations — works both locally and in Docker
const possibleBuildPaths = [
  path.join(__dirname, '../../build'),      // Local: app/src/server -> app/build
  path.join(__dirname, '../../../build'),   // Alternative nesting
  path.join(process.cwd(), 'build'),        // Docker: /app/build
  '/app/build',                             // Docker absolute path
];

let BUILD_PATH = null;
for (const p of possibleBuildPaths) {
  if (fs.existsSync(path.join(p, 'index.html'))) {
    BUILD_PATH = p;
    break;
  }
}

if (BUILD_PATH) {
  logger.info(`Serving React app from: ${BUILD_PATH}`);
} else {
  logger.warn('React build directory not found. Serving API only.');
  logger.warn('Searched paths:', { paths: possibleBuildPaths });
}

// ===========================
// Middleware
// ===========================
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to allow React app to load
  })
);

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim(), { type: 'http' }),
  },
  skip: (req) => req.url === '/health' || req.url === '/ready',
}));

app.use((req, res, next) => {
  requestCount++;
  next();
});

app.use(express.json());

// ===========================
// Health Check Routes
// ===========================
app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);
  res.status(200).json({
    status: 'healthy',
    app: APP_NAME,
    version: APP_VERSION,
    uptime: `${uptime}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'ready',
    app: APP_NAME,
    checks: { server: 'ok' },
  });
});

app.get('/metrics', (req, res) => {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);
  const metrics = [
    `# HELP app_requests_total Total number of HTTP requests`,
    `# TYPE app_requests_total counter`,
    `app_requests_total{app="${APP_NAME}"} ${requestCount}`,
    ``,
    `# HELP app_errors_total Total number of errors`,
    `# TYPE app_errors_total counter`,
    `app_errors_total{app="${APP_NAME}"} ${errorCount}`,
    ``,
    `# HELP app_uptime_seconds Application uptime in seconds`,
    `# TYPE app_uptime_seconds gauge`,
    `app_uptime_seconds{app="${APP_NAME}"} ${uptime}`,
    ``,
    `# HELP app_info Application info`,
    `# TYPE app_info gauge`,
    `app_info{app="${APP_NAME}",version="${APP_VERSION}"} 1`,
  ].join('\n');

  res.set('Content-Type', 'text/plain');
  res.send(metrics);
});

app.get('/api/info', (req, res) => {
  res.json({
    name: APP_NAME,
    version: APP_VERSION,
    description: 'Tetris game with full DevOps pipeline',
    buildPath: BUILD_PATH || 'not found',
    endpoints: {
      health: '/health',
      ready: '/ready',
      metrics: '/metrics',
    },
  });
});

// ===========================
// Serve React App
// ===========================
if (BUILD_PATH) {
  // Serve all static files (JS, CSS, images)
  app.use(express.static(BUILD_PATH));

  // For ANY route not matched above, serve index.html
  // This lets React Router handle client-side routing
  app.get('*', (req, res) => {
    const indexPath = path.join(BUILD_PATH, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        errorCount++;
        logger.error('Failed to send index.html', { error: err.message, indexPath });
        res.status(500).json({ error: 'Failed to load application' });
      }
    });
  });
} else {
  // No build found — show helpful debug page
  app.get('*', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tetris DevOps - Debug</title>
          <style>
            body { font-family: monospace; background: #0a0a1a; color: #80E3E6; padding: 40px; }
            h1 { color: #E34E4E; }
            pre { background: #111; padding: 20px; border-radius: 8px; color: #aaa; }
            .ok { color: #41E837; }
            .fail { color: #E34E4E; }
          </style>
        </head>
        <body>
          <h1>⚠️ React build not found</h1>
          <p>The server is running but cannot find the built React files.</p>
          <h3>Searched these paths:</h3>
          <pre>${possibleBuildPaths.join('\n')}</pre>
          <h3>API endpoints working:</h3>
          <pre>
<a href="/health" style="color:#80E3E6">/health</a>   - <span class="ok">✓ working</span>
<a href="/ready" style="color:#80E3E6">/ready</a>    - <span class="ok">✓ working</span>
<a href="/metrics" style="color:#80E3E6">/metrics</a>  - <span class="ok">✓ working</span>
<a href="/api/info" style="color:#80E3E6">/api/info</a> - <span class="ok">✓ working</span>
          </pre>
        </body>
      </html>
    `);
  });
}

// ===========================
// Error Handler
// ===========================
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  errorCount++;
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// ===========================
// Start Server
// ===========================
if (require.main === module) {
  const server = app.listen(PORT, () => {
    logger.info(`🚀 ${APP_NAME} server started`, {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      version: APP_VERSION,
      buildPath: BUILD_PATH || 'NOT FOUND',
      healthCheck: `http://localhost:${PORT}/health`,
    });
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received — graceful shutdown');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received — graceful shutdown');
    server.close(() => process.exit(0));
  });
}

module.exports = app;