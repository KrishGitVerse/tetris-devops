#!/bin/bash
# =============================================================
# install-plugins.sh
# Installs required Jenkins plugins inside the container
# Run ONCE after Jenkins first starts
# =============================================================

set -e

JENKINS_URL="http://localhost:8080"
JENKINS_USER="admin"

# Wait for Jenkins to be fully ready
echo "Waiting for Jenkins to start..."
until curl -s "$JENKINS_URL/login" | grep -q "Jenkins"; do
  echo "  Jenkins not ready yet — waiting 5 seconds..."
  sleep 5
done
echo "Jenkins is up!"

# Get initial admin password
JENKINS_PASSWORD=$(docker exec jenkins \
  cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null || echo "")

if [ -z "$JENKINS_PASSWORD" ]; then
  echo "ERROR: Could not get Jenkins password"
  echo "Try: docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword"
  exit 1
fi

echo "Admin password retrieved successfully"

# Install plugins using Jenkins CLI
# These are the plugins our pipeline needs
PLUGINS=(
  "git"                    # Pull code from GitHub
  "github"                 # GitHub integration
  "workflow-aggregator"    # Pipeline support (Declarative Jenkinsfile)
  "docker-workflow"        # Docker commands in pipeline
  "docker-plugin"          # Docker build/push
  "credentials-binding"    # Securely use secrets in pipeline
  "pipeline-stage-view"    # Visual pipeline stages in UI
  "blueocean"              # Modern Jenkins UI
  "sonar"                  # SonarQube integration (Phase 5)
  "nodejs"                 # Node.js tool support
)

echo ""
echo "Installing plugins..."
for plugin in "${PLUGINS[@]}"; do
  echo "  Installing: $plugin"
  curl -s -X POST \
    "$JENKINS_URL/pluginManager/installNecessaryPlugins" \
    --user "$JENKINS_USER:$JENKINS_PASSWORD" \
    -d "<jenkins><install plugin='$plugin@latest'/></jenkins>" \
    -H "Content-Type: text/xml" > /dev/null
done

echo ""
echo "Plugins installed! Restarting Jenkins..."
curl -s -X POST "$JENKINS_URL/safeRestart" \
  --user "$JENKINS_USER:$JENKINS_PASSWORD"

echo "Jenkins restarting — wait 30 seconds then open http://localhost:8080"