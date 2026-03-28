#!/bin/bash
# =============================================================
# push-image.sh — Build, tag, and push to Docker Hub
# Usage: ./scripts/push-image.sh [version]
# Example: ./scripts/push-image.sh 1.0.1
# =============================================================

set -e  # Exit immediately if any command fails

# Load credentials
if [ -f ../../.devops-secrets/dockerhub.env ]; then
  source ../../.devops-secrets/dockerhub.env
else
  echo "ERROR: ~/.devops-secrets/dockerhub.env not found"
  echo "Create it with DOCKERHUB_USERNAME and DOCKERHUB_TOKEN"
  exit 1
fi

# Configuration
VERSION=${1:-"1.0.0"}
GIT_HASH=$(git rev-parse --short HEAD)
IMAGE="$DOCKERHUB_USERNAME/tetris-devops"

echo "============================================"
echo "  Building and pushing Tetris DevOps image"
echo "============================================"
echo "  Registry : docker.io"
echo "  Image    : $IMAGE"
echo "  Version  : $VERSION"
echo "  Git Hash : $GIT_HASH"
echo "============================================"

# Login
echo ""
echo "Step 1/4: Logging in to Docker Hub..."
echo "$DOCKERHUB_TOKEN" | docker login \
  --username "$DOCKERHUB_USERNAME" \
  --password-stdin

# Build
echo ""
echo "Step 2/4: Building image..."
docker build \
  -f docker/Dockerfile \
  -t tetris-devops:latest \
  . \
  --no-cache

# Tag
echo ""
echo "Step 3/4: Tagging image..."
docker tag tetris-devops:latest "$IMAGE:latest"
docker tag tetris-devops:latest "$IMAGE:$VERSION"
docker tag tetris-devops:latest "$IMAGE:$VERSION-$GIT_HASH"

# Push
echo ""
echo "Step 4/4: Pushing to Docker Hub..."
docker push "$IMAGE:latest"
docker push "$IMAGE:$VERSION"
docker push "$IMAGE:$VERSION-$GIT_HASH"

echo ""
echo "============================================"
echo "  SUCCESS!"
echo "  Pushed:"
echo "    $IMAGE:latest"
echo "    $IMAGE:$VERSION"
echo "    $IMAGE:$VERSION-$GIT_HASH"
echo "============================================"