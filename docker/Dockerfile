# =============================================================
# STAGE 1: Build React App
# =============================================================
# --platform=$BUILDPLATFORM tells Docker to always run the
# builder stage on YOUR machine's native platform
# This avoids slow emulation during npm install and build
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm install

COPY app/public/ ./public/
COPY app/src/ ./src/

ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# Verify build output
RUN echo "=== Build contents ===" && ls -la /app/build/

# =============================================================
# STAGE 2: Production Server
# =============================================================
# This stage runs on the TARGET platform (amd64 OR arm64)
FROM node:20-alpine AS production

# Security: non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install --only=production && \
    npm cache clean --force

# Copy React build from builder stage
COPY --from=builder /app/build ./build

# Copy server files
COPY app/src/server/index.js ./src/server/index.js
COPY app/src/utils/logger.js  ./src/utils/logger.js

# Create logs directory
RUN mkdir -p logs && \
    chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 3001

# Use wget which is available in alpine
# Falls back gracefully if wget missing
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider \
        http://localhost:3001/health 2>/dev/null || \
        node -e "require('http').get('http://localhost:3001/health', r => process.exit(r.statusCode===200?0:1))"

ENV NODE_ENV=production
ENV PORT=3001
ENV APP_NAME=tetris-devops
ENV APP_VERSION=1.0.0

CMD ["node", "src/server/index.js"]