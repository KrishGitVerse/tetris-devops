#!/bin/bash
# =============================================================
# setup.sh — One-command project setup for any machine
# Usage: ./scripts/setup.sh
# Works on: macOS, Ubuntu, Debian
# Requires: Git, Node.js 18+, Docker
# =============================================================

set -e  # Stop immediately if anything fails

# ── Colors for output ─────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ── Helper functions ──────────────────────────────────────
print_header() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║  $1${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════╝${NC}"
  echo ""
}

print_step() {
  echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
  exit 1
}

# ── Header ────────────────────────────────────────────────
print_header "Tetris DevOps — Project Setup"
echo -e "  This script will:"
echo -e "  1. Check all prerequisites"
echo -e "  2. Install dependencies"
echo -e "  3. Run all tests"
echo -e "  4. Build and run the app"
echo ""

# =============================================================
# STEP 1: Check Prerequisites
# =============================================================
print_header "STEP 1: Checking Prerequisites"

# Check Git
print_step "Checking Git..."
if ! command -v git &> /dev/null; then
  print_error "Git not found. Install from https://git-scm.com"
fi
GIT_VERSION=$(git --version | awk '{print $3}')
print_success "Git found: $GIT_VERSION"

# Check Node.js
print_step "Checking Node.js..."
if ! command -v node &> /dev/null; then
  print_error "Node.js not found. Install from https://nodejs.org (choose LTS)"
fi
NODE_VERSION=$(node --version)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR" -lt 18 ]; then
  print_error "Node.js $NODE_VERSION found but 18+ required. Update at https://nodejs.org"
fi
print_success "Node.js found: $NODE_VERSION"

# Check npm
print_step "Checking npm..."
if ! command -v npm &> /dev/null; then
  print_error "npm not found. It should come with Node.js"
fi
NPM_VERSION=$(npm --version)
print_success "npm found: $NPM_VERSION"

# Check Docker
print_step "Checking Docker..."
if ! command -v docker &> /dev/null; then
  echo ""
  print_warning "Docker not found."
  echo "  Install Docker Desktop from: https://www.docker.com/products/docker-desktop"
  echo "  Docker is required to run the containerized app."
  echo "  You can still run tests without it."
  DOCKER_AVAILABLE=false
else
  # Check Docker is actually running
  if ! docker ps &> /dev/null; then
    print_warning "Docker is installed but not running. Start Docker Desktop."
    DOCKER_AVAILABLE=false
  else
    DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
    print_success "Docker found and running: $DOCKER_VERSION"
    DOCKER_AVAILABLE=true
  fi
fi

echo ""
print_success "All required prerequisites found!"

# =============================================================
# STEP 2: Install Dependencies
# =============================================================
print_header "STEP 2: Installing Dependencies"

print_step "Installing npm packages..."
cd app
npm install
print_success "Dependencies installed ($(ls node_modules | wc -l | tr -d ' ') packages)"
cd ..

# =============================================================
# STEP 3: Run Tests
# =============================================================
print_header "STEP 3: Running Tests"

print_step "Running unit tests..."
cd app

# Run tests and capture result
if npx jest --watchAll=false --no-coverage --verbose --forceExit; then
  print_success "All tests passed!"
else
  print_error "Tests failed! Fix the errors before proceeding."
fi

print_step "Running tests with coverage..."
if npx jest --watchAll=false --coverage --forceExit; then
  print_success "Coverage report generated at app/coverage/lcov-report/index.html"
else
  print_warning "Coverage thresholds not met but continuing..."
fi

cd ..

# =============================================================
# STEP 4: Build React App
# =============================================================
print_header "STEP 4: Building React App"

print_step "Creating production build..."
cd app
if CI=false DISABLE_ESLINT_PLUGIN=true npm run build; then
  BUILD_SIZE=$(du -sh build/ 2>/dev/null | cut -f1)
  print_success "React app built successfully (build size: $BUILD_SIZE)"
else
  print_error "React build failed!"
fi
cd ..

# =============================================================
# STEP 5: Docker Build + Run (if Docker available)
# =============================================================
if [ "$DOCKER_AVAILABLE" = true ]; then
  print_header "STEP 5: Docker Build and Run"

  # Clean up any existing container
  print_step "Cleaning up any existing containers..."
  docker rm -f tetris-app 2>/dev/null && \
    echo "  Removed existing container" || \
    echo "  No existing container found"

  # Build image
  print_step "Building Docker image..."
  if docker build -f docker/Dockerfile -t tetris-devops:latest . --quiet; then
    IMAGE_SIZE=$(docker images tetris-devops:latest \
      --format "{{.Size}}" 2>/dev/null)
    print_success "Docker image built (size: $IMAGE_SIZE)"
  else
    print_error "Docker build failed!"
  fi

  # Run container
  print_step "Starting container..."
  docker run -d \
    -p 3001:3001 \
    --name tetris-app \
    --env NODE_ENV=production \
    --env APP_NAME=tetris-devops \
    --env APP_VERSION=1.0.0 \
    tetris-devops:latest

  # Wait for startup
  print_step "Waiting for app to start..."
  sleep 5

  # Health check
  print_step "Running health check..."
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    http://localhost:3001/health)

  if [ "$HTTP_CODE" = "200" ]; then
    print_success "Health check passed (HTTP $HTTP_CODE)"
  else
    print_error "Health check failed (HTTP $HTTP_CODE)"
  fi

else
  print_header "STEP 5: Skipped (Docker not available)"
  print_warning "Install Docker Desktop to run the containerized app"
fi

# =============================================================
# Summary
# =============================================================
print_header "Setup Complete!"

echo -e "  ${GREEN}What's running:${NC}"
echo ""

if [ "$DOCKER_AVAILABLE" = true ]; then
  echo -e "  ${CYAN}🎮 Tetris App${NC}     → http://localhost:3001"
  echo -e "  ${CYAN}❤️  Health Check${NC}  → http://localhost:3001/health"
  echo -e "  ${CYAN}📊 Metrics${NC}        → http://localhost:3001/metrics"
  echo -e "  ${CYAN}ℹ️  API Info${NC}       → http://localhost:3001/api/info"
fi

echo ""
echo -e "  ${GREEN}Useful commands:${NC}"
echo ""
echo -e "  ${YELLOW}# Stop the app${NC}"
echo -e "  docker rm -f tetris-app"
echo ""
echo -e "  ${YELLOW}# View logs${NC}"
echo -e "  docker logs -f tetris-app"
echo ""
echo -e "  ${YELLOW}# Run tests${NC}"
echo -e "  cd app && npx jest --watchAll=false"
echo ""
echo -e "  ${YELLOW}# Open coverage report${NC}"
echo -e "  open app/coverage/lcov-report/index.html"
echo ""

if [ "$DOCKER_AVAILABLE" = true ]; then
  # Auto-open browser on Mac
  if [[ "$OSTYPE" == "darwin"* ]]; then
    print_step "Opening app in browser..."
    sleep 2
    open http://localhost:3001
  fi
fi

echo -e "${GREEN}Done! 🚀${NC}"
echo ""