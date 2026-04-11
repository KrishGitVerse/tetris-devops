# Tetris DevOps

Production-grade Tetris with full CI/CD pipeline.

## Prerequisites

| Tool | Mac | Windows | Linux |
|------|-----|---------|-------|
| Git | [git-scm.com](https://git-scm.com) | [git-scm.com](https://git-scm.com) | `sudo apt install git` |
| Node.js 18+ | [nodejs.org](https://nodejs.org) | [nodejs.org](https://nodejs.org) | `curl -fsSL https://deb.nodesource.com/setup_20.x \| sudo bash -` |
| Docker | [Docker Desktop](https://www.docker.com/products/docker-desktop) | [Docker Desktop](https://www.docker.com/products/docker-desktop) | `curl -fsSL https://get.docker.com \| sh` |

## Quick start — any OS

```bash
git clone https://github.com/KrishGitVerse/tetris-devops.git
cd tetris-devops
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**Windows users** — run in Git Bash or WSL2, not Command Prompt.

## Run with Docker only (no Node.js needed)

```bash
# Pull and run directly from Docker Hub — works on any OS
docker run -d \
  -p 3001:3001 \
  --name tetris-app \
  techiekrish/tetris-devops:latest

# Open http://localhost:3001
```

## Start Jenkins

```bash
# Mac / Linux
docker compose -f jenkins/jenkins-docker-compose.yml up -d

# Windows (Git Bash)
docker compose -f jenkins/jenkins-docker-compose.windows.yml up -d
```

## Start SonarQube

```bash
# All OS — same command
docker compose -f sonarqube/sonarqube-docker-compose.yml up -d
```

## API endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /` | Tetris game |
| `GET /health` | Liveness probe |
| `GET /ready` | Readiness probe |
| `GET /metrics` | Prometheus metrics |
| `GET /api/info` | App info |