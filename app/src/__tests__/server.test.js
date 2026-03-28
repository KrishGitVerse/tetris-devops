/**
 * server.test.js — Integration tests for Express server
 * Uses Node.js built-in http module instead of supertest
 * to avoid dependency compatibility issues
 */

process.env.NODE_ENV = 'test';
process.env.PORT = '3099';
process.env.APP_NAME = 'tetris-devops';
process.env.APP_VERSION = '1.0.0';
process.env.LOG_LEVEL = 'error'; // Suppress logs during tests

const http = require('http');

// Helper: make an HTTP request and return { status, headers, body }
const makeRequest = (path, server) => {
  return new Promise((resolve, reject) => {
    const address = server.address();
    const options = {
      hostname: '127.0.0.1',
      port: address.port,
      path,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let body;
        try {
          body = JSON.parse(data);
        } catch {
          body = data; // plain text (for /metrics)
        }
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    });

    req.on('error', reject);
    req.end();
  });
};

let server;
let app;

beforeAll((done) => {
  jest.resetModules();
  app = require('../server/index');
  server = app.listen(0, '127.0.0.1', done); // port 0 = random available port
});

afterAll((done) => {
  server.close(done);
});

describe('GET /health', () => {
  it('should return 200 with healthy status', async () => {
    const { status, body } = await makeRequest('/health', server);
    expect(status).toBe(200);
    expect(body.status).toBe('healthy');
    expect(body).toHaveProperty('uptime');
    expect(body).toHaveProperty('timestamp');
  });

  it('should return JSON content type', async () => {
    const { headers } = await makeRequest('/health', server);
    expect(headers['content-type']).toMatch(/json/);
  });
});

describe('GET /ready', () => {
  it('should return 200 with ready status', async () => {
    const { status, body } = await makeRequest('/ready', server);
    expect(status).toBe(200);
    expect(body.status).toBe('ready');
  });
});

describe('GET /metrics', () => {
  it('should return metrics in Prometheus format', async () => {
    const { status, headers, body } = await makeRequest('/metrics', server);
    expect(status).toBe(200);
    expect(headers['content-type']).toMatch(/text\/plain/);
    expect(body).toContain('app_requests_total');
    expect(body).toContain('app_uptime_seconds');
  });
});

describe('GET /api/info', () => {
  it('should return app information', async () => {
    const { status, body } = await makeRequest('/api/info', server);
    expect(status).toBe(200);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('version');
    expect(body.endpoints).toHaveProperty('health');
  });
});