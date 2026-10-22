#!/usr/bin/env bash
# Fetch origin/main, fast-forward, rebuild the site if anything that affects it changed.
#   bash scripts/deploy.sh          # deploy if origin/main has new commits
#   bash scripts/deploy.sh --all    # force a full rebuild
set -euo pipefail
cd "$(dirname "$0")/.."

exec 9>/tmp/surface_legend_deploy.lock
if ! flock -w 540 9; then
  echo "[deploy] another deploy held the lock too long, skipping."
  exit 0
fi

FORCE="${1:-}"
git fetch origin main --quiet
PREV="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"
if [ "$PREV" = "$REMOTE" ] && [ "$FORCE" != "--all" ]; then
  exit 0
fi

echo "[deploy] $(date '+%F %T') deploying $PREV -> $REMOTE"
git reset --hard origin/main --quiet
CUR="$(git rev-parse HEAD)"
if [ "$FORCE" = "--all" ]; then CHANGED="$(git ls-files)"
else CHANGED="$(git diff --name-only "$PREV" "$CUR")"; fi
echo "$CHANGED" | sed 's/^/    /'

# Source, public files, build config or the container setup change the site; documents and media archives do not.
if [ "$FORCE" = "--all" ] || echo "$CHANGED" | grep -qE '^(src/|public/|patches/|deploy/|index\.html|package\.json|pnpm-lock\.yaml|vite\.config\.ts|tsconfig.*\.json|Dockerfile|docker-compose\.yml)'; then
  echo "[deploy] rebuilding web"
  docker compose up -d --build web
  docker image prune -f >/dev/null
else
  echo "[deploy] nothing to rebuild."
fi
docker compose ps
