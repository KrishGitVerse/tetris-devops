# 🎮 Tetris DevOps

A production-grade Tetris game built with a full DevOps pipeline.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Backend | Node.js + Express |
| Containerization | Docker (multi-stage) |
| CI Pipeline | Jenkins |
| Code Quality | SonarQube |
| Orchestration | Kubernetes (Minikube) |
| GitOps | ArgoCD |
| Monitoring | Prometheus + Grafana |

## ⚡ Quick Start (Any Machine)

### Prerequisites
- [Git](https://git-scm.com)
- [Node.js 18+](https://nodejs.org) — choose LTS
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### One-command setup
```bash
git clone https://github.com/KrishGitVerse/tetris-devops.git
cd tetris-devops
chmod +x scripts/setup.sh
./scripts/setup.sh
```

App opens automatically at **http://localhost:3001** 🎮

---

## 🧪 Run Tests Only (no Docker needed)

```bash
git clone https://github.com/KrishGitVerse/tetris-devops.git
cd tetris-devops
cd app
npm install
npx jest --watchAll=false --verbose
```

---

## 🐳 Run with Docker manually

```bash
# Build
docker build -f docker/Dockerfile -t tetris-devops:latest .

# Run
docker run -d -p 3001:3001 --name tetris-app tetris-devops:latest

# Open
open http://localhost:3001
```

---

## 🔌 API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /` | Tetris game UI |
| `GET /health` | Kubernetes liveness probe |
| `GET /ready` | Kubernetes readiness probe |
| `GET /metrics` | Prometheus metrics |
| `GET /api/info` | App information |

---

## 📁 Project Structure

```
tetris-devops/
├── app/                  # React + Node.js application
│   ├── src/
│   │   ├── App.jsx       # Main Tetris game
│   │   ├── server/       # Express server
│   │   └── utils/        # Game logic + logger
│   └── __tests__/        # Unit tests
├── docker/               # Dockerfile
├── jenkins/              # Jenkinsfile + Jenkins setup
├── k8s/                  # Kubernetes manifests (Phase 6)
├── monitoring/           # Prometheus + Grafana (Phase 8)
└── scripts/              # Automation scripts
```

---

## 🚀 CI/CD Pipeline

```
git push → Jenkins → Test → Build → Push to Docker Hub → Deploy
```

Jenkins runs at **http://localhost:8080**

---

## 🛑 Stop Everything

```bash
# Stop the app
docker rm -f tetris-app

# Stop Jenkins
docker compose -f jenkins/jenkins-docker-compose.yml down
```