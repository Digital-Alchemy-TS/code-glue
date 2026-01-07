#!/bin/bash
set -e

# This script starts a Home Assistant dev container with Supervisor
# so you can test your addon as if it were installed in a real HA instance

CONTAINER_NAME="ha-dev"
IMAGE="ghcr.io/home-assistant/devcontainer:addons"
HA_CONFIG_DIR="${HOME}/.ha-dev-config"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🏠 Starting Home Assistant dev environment..."
echo "   Config: ${HA_CONFIG_DIR}"
echo "   Addon repo: ${REPO_DIR}"
echo ""

# Stop existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop ${CONTAINER_NAME} >/dev/null 2>&1 || true
    docker rm ${CONTAINER_NAME} >/dev/null 2>&1 || true
fi

# Create config directory if it doesn't exist
mkdir -p "${HA_CONFIG_DIR}"

echo "🚀 Starting container..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --privileged \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "${HA_CONFIG_DIR}:/config" \
  -v "${REPO_DIR}:/mnt/supervisor/addons/local/code-glue" \
  -p 7123:8123 \
  -p 7357:4357 \
  -e SUPERVISOR_NAME=hassio_supervisor \
  ${IMAGE}

echo "✅ Container started!"
echo ""
echo "📍 Home Assistant will be available at: http://localhost:7123"
echo ""
echo "To view logs:"
echo "  docker logs -f ${CONTAINER_NAME}"
echo ""
echo "To access shell:"
echo "  docker exec -it ${CONTAINER_NAME} bash"
echo ""
echo "To rebuild your addon after changes:"
echo "  docker exec -it ${CONTAINER_NAME} ha addons rebuild local_code_glue"
echo ""
echo "To stop:"
echo "  docker stop ${CONTAINER_NAME}"
echo ""
echo "⏳ Wait ~30 seconds for Home Assistant to start, then visit http://localhost:7123"
