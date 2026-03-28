# =============================================================
# STAGE 1: Build React App
# =============================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install

COPY app/public/ ./public/
COPY app/src/ ./src/

ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# Verify build output exists
RUN echo "=== Build contents ===" && ls -la /app/build/

# =============================================================
# STAGE 2: Production Server
# =============================================================
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install --only=production && \
    npm cache clean --force

# Copy React build output
COPY --from=builder /app/build ./build

# Copy server and utilities — maintaining exact structure
COPY app/src/server/index.js ./src/server/index.js
COPY app/src/utils/logger.js ./src/utils/logger.js

# Verify ALL required files exist before starting
RUN echo "=== Verifying file structure ===" && \
    ls -la /app/ && \
    ls -la /app/build/ && \
    ls -la /app/src/server/ && \
    ls -la /app/src/utils/ && \
    echo "=== index.html check ===" && \
    cat /app/build/index.html | head -5 && \
    echo "=== All files OK ==="

RUN mkdir -p logs && \
    chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

ENV NODE_ENV=production
ENV PORT=3001
ENV APP_NAME=tetris-devops
ENV APP_VERSION=1.0.0

CMD ["node", "src/server/index.js"]