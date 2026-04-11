#!/bin/bash
# =============================================================
# push-image.sh — Multi-platform build and push to Docker Hub
# Builds for: linux/amd64 AND linux/arm64
# Usage: ./scripts/push-image.sh [version]
# =============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_step()    { echo -e "${BLUE}▶ $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error()   { echo -e "${RED}❌ $1${NC}"; exit 1; }

# Load credentials
if [ -f ../../.devops-secrets/dockerhub.env ]; then
  source ../../.devops-secrets/dockerhub.env
else
  print_error "../../.devops-secrets/dockerhub.env not found"
fi

VERSION=${1:-"1.0.0"}
GIT_HASH=$(git rev-parse --short HEAD)
IMAGE="$DOCKERHUB_USERNAME/tetris-devops"
PLATFORMS="linux/amd64,linux/arm64"

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Multi-platform Docker build + push      ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Image     : ${IMAGE}"
echo -e "  Version   : ${VERSION}"
echo -e "  Git hash  : ${GIT_HASH}"
echo -e "  Platforms : ${PLATFORMS}"
echo ""

# Step 1: Login
print_step "Logging in to Docker Hub..."
echo "$DOCKERHUB_TOKEN" | docker login \
  --username "$DOCKERHUB_USERNAME" \
  --password-stdin
print_success "Login successful"

# Step 2: Set up buildx
print_step "Setting up multi-platform builder..."

# Remove old builder if exists
docker buildx rm multiplatform-builder 2>/dev/null || true

# Create fresh builder
docker buildx create \
  --name multiplatform-builder \
  --driver docker-container \
  --platform linux/amd64,linux/arm64 \
  --use

# Bootstrap it
docker buildx inspect --bootstrap
print_success "Builder ready"

# Step 3: Build and push all platforms in one command
# --push sends directly to Docker Hub
# No local image is created (multi-platform images cant be loaded locally)
print_step "Building for linux/amd64 and linux/arm64..."
print_step "This takes 3-5 minutes on first run..."

docker buildx build \
  --platform "$PLATFORMS" \
  --file docker/Dockerfile \
  --tag "$IMAGE:latest" \
  --tag "$IMAGE:$VERSION" \
  --tag "$IMAGE:$VERSION-$GIT_HASH" \
  --push \
  .

print_success "Multi-platform image pushed!"

# Step 4: Verify both platforms exist on Docker Hub
print_step "Verifying platforms on Docker Hub..."

docker buildx imagetools inspect "$IMAGE:latest"

# Cleanup builder
print_step "Cleaning up builder..."
docker buildx rm multiplatform-builder 2>/dev/null || true
docker buildx use default

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  SUCCESS — both platforms pushed          ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Pushed tags:"
echo -e "    ${IMAGE}:latest"
echo -e "    ${IMAGE}:${VERSION}"
echo -e "    ${IMAGE}:${VERSION}-${GIT_HASH}"
echo ""
echo -e "  Platforms:"
echo -e "    linux/amd64  ← Intel/AMD (Windows, Linux, Intel Mac)"
echo -e "    linux/arm64  ← Apple Silicon (M1/M2/M3 Mac)"