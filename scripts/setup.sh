#!/bin/bash
# =============================================================
# setup.sh — OS-independent project setup
# Works on: macOS, Ubuntu, Debian, CentOS, Windows (Git Bash)
# Requires: Git, Node.js 18+, Docker
# =============================================================

set -e

# ── Colors ───────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║  $1${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════╝${NC}"
  echo ""
}

print_step()    { echo -e "${BLUE}▶ $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error()   { echo -e "${RED}❌ $1${NC}"; exit 1; }

# ── Detect OS ────────────────────────────────────────────────
detect_os() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
  else
    OS="unknown"
  fi
  echo $OS
}

OS=$(detect_os)

# ── Open browser cross-platform ──────────────────────────────
open_browser() {
  local url=$1
  case $OS in
    mac)     open "$url" ;;
    linux)   xdg-open "$url" 2>/dev/null || \
             sensible-browser "$url" 2>/dev/null || \
             echo "Open manually: $url" ;;
    windows) start "$url" ;;
    *)       echo "Open manually: $url" ;;
  esac
}

# ── Header ───────────────────────────────────────────────────
print_header "Tetris DevOps — OS-independent setup"
echo -e "  Detected OS: ${CYAN}$OS${NC}"
echo ""

# =============================================================
# STEP 1: Check prerequisites
# =============================================================
print_header "STEP 1: Checking prerequisites"

# Git
print_step "Checking Git..."
command -v git &>/dev/null || print_error "Git not found. Install: https://git-scm.com"
print_success "Git: $(git --version)"

# Node.js
print_step "Checking Node.js..."
command -v node &>/dev/null || print_error "Node.js not found. Install: https://nodejs.org (LTS)"
NODE_MAJOR=$(node --version | cut -d'.' -f1 | tr -d 'v')
[ "$NODE_MAJOR" -lt 18 ] && print_error "Node.js 18+ required. Current: $(node --version)"
print_success "Node.js: $(node --version)"

# Docker
print_step "Checking Docker..."
DOCKER_AVAILABLE=false
if command -v docker &>/dev/null; then
  if docker ps &>/dev/null; then
    print_success "Docker: $(docker --version | awk '{print $3}' | tr -d ',')"
    DOCKER_AVAILABLE=true
  else
    print_warning "Docker installed but not running"
    case $OS in
      mac)     echo "  Start Docker Desktop from Applications" ;;
      linux)   echo "  Run: sudo systemctl start docker" ;;
      windows) echo "  Start Docker Desktop from taskbar" ;;
    esac
  fi
else
  print_warning "Docker not found"
  case $OS in
    mac)     echo "  Install: https://www.docker.com/products/docker-desktop" ;;
    linux)   echo "  Install: curl -fsSL https://get.docker.com | sh" ;;
    windows) echo "  Install: https://www.docker.com/products/docker-desktop" ;;
  esac
fi

# =============================================================
# STEP 2: Install dependencies
# =============================================================
print_header "STEP 2: Installing dependencies"

cd app
print_step "Running npm install..."
npm install
print_success "Dependencies installed"
cd ..

# =============================================================
# STEP 3: Run tests
# =============================================================
print_header "STEP 3: Running tests"

cd app
print_step "Running unit tests..."
npx jest --watchAll=false --no-coverage --verbose --forceExit
print_success "All tests passed"

print_step "Generating coverage report..."
npx jest --watchAll=false --coverage --forceExit 2>/dev/null || true
print_success "Coverage report: app/coverage/lcov-report/index.html"
cd ..

# =============================================================
# STEP 4: Build React app
# =============================================================
print_header "STEP 4: Building React app"

cd app
print_step "Creating production build..."
CI=false DISABLE_ESLINT_PLUGIN=true npm run build
print_success "Build complete"
cd ..

# =============================================================
# STEP 5: Docker build and run
# =============================================================
if [ "$DOCKER_AVAILABLE" = true ]; then
  print_header "STEP 5: Docker build and run"

  print_step "Removing any existing container..."
  docker rm -f tetris-app 2>/dev/null || true

  print_step "Building Docker image..."
  docker build -f docker/Dockerfile -t tetris-devops:latest . --quiet
  print_success "Image built: $(docker images tetris-devops:latest --format '{{.Size}}')"

  print_step "Starting container..."
  docker run -d \
    -p 3001:3001 \
    --name tetris-app \
    --env NODE_ENV=production \
    --env APP_NAME=tetris-devops \
    --env APP_VERSION=1.0.0 \
    tetris-devops:latest

  print_step "Waiting for startup..."
  sleep 5

  print_step "Health check..."
  HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
  [ "$HTTP" = "200" ] && print_success "Health check passed (HTTP $HTTP)" || \
    print_error "Health check failed (HTTP $HTTP)"
else
  print_header "STEP 5: Skipped — Docker not available"
fi

# =============================================================
# Summary
# =============================================================
print_header "Setup complete!"

if [ "$DOCKER_AVAILABLE" = true ]; then
  echo -e "  ${CYAN}Game        ${NC}→ http://localhost:3001"
  echo -e "  ${CYAN}Health      ${NC}→ http://localhost:3001/health"
  echo -e "  ${CYAN}Metrics     ${NC}→ http://localhost:3001/metrics"
fi

echo ""
echo -e "  ${YELLOW}Stop app   :${NC} docker rm -f tetris-app"
echo -e "  ${YELLOW}View logs  :${NC} docker logs -f tetris-app"
echo -e "  ${YELLOW}Run tests  :${NC} cd app && npx jest --watchAll=false"
echo ""

if [ "$DOCKER_AVAILABLE" = true ]; then
  open_browser "http://localhost:3001"
fi

echo -e "${GREEN}Done!${NC}"