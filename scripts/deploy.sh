#!/usr/bin/env bash
# Fetch origin/main, fast-forward, rebuild what changed: the website, the admin, or both.
#   bash scripts/deploy.sh          # deploy if origin/main has new commits
#   bash scripts/deploy.sh --all    # force a full rebuild
# A commit counts as deployed only once it has built and started. A failed build keeps the old site
# running, is logged with FAILED, and is tried again every 30 minutes until a new commit or --all.
set -euo pipefail
cd "$(dirname "$0")/.."

exec 9>/tmp/surface_legend_deploy.lock
if ! flock -w 540 9; then
  echo "[deploy] another deploy held the lock too long, skipping."
  exit 0
fi

OK_FILE="scripts/.last-deployed"
FAILED_FILE="scripts/.last-failed"
RETRY_AFTER=1800

FORCE="${1:-}"
git fetch origin main --quiet
REMOTE="$(git rev-parse origin/main)"
# First run of this version: what is checked out was deployed by the previous one.
[ -f "$OK_FILE" ] || git rev-parse HEAD > "$OK_FILE"
PREV="$(cat "$OK_FILE")"
if [ "$PREV" = "$REMOTE" ] && [ "$FORCE" != "--all" ]; then
  exit 0
fi
if [ "$FORCE" != "--all" ] && [ -f "$FAILED_FILE" ]; then
  read -r FAILED_COMMIT FAILED_AT < "$FAILED_FILE"
  if [ "$FAILED_COMMIT" = "$REMOTE" ] && [ $(( $(date +%s) - FAILED_AT )) -lt "$RETRY_AFTER" ]; then
    exit 0
  fi
fi

trap 'echo "$REMOTE $(date +%s)" > "$FAILED_FILE"; echo "[deploy] $(date "+%F %T") FAILED on $REMOTE: the previous version keeps running, next try in 30 minutes."' ERR

echo "[deploy] $(date '+%F %T') deploying $PREV -> $REMOTE"
git reset --hard origin/main --quiet
CUR="$(git rev-parse HEAD)"
if [ "$FORCE" = "--all" ]; then CHANGED="$(git ls-files)"
else CHANGED="$(git diff --name-only "$PREV" "$CUR")"; fi
echo "$CHANGED" | sed 's/^/    /'

# Source, public files, build config or the container setup change the site; documents and media archives do not.
SERVICES=""
if [ "$FORCE" = "--all" ] || echo "$CHANGED" | grep -qE '^(src/|public/|patches/|deploy/|index\.html|package\.json|pnpm-lock\.yaml|vite\.config\.ts|tsconfig.*\.json|Dockerfile|docker-compose\.yml)'; then
  SERVICES="web"
fi
if [ "$FORCE" = "--all" ] || echo "$CHANGED" | grep -qE '^(admin/|docker-compose\.yml)'; then
  SERVICES="$SERVICES admin"
fi
if [ -n "$SERVICES" ]; then
  echo "[deploy] rebuilding:$SERVICES"
  # shellcheck disable=SC2086
  docker compose build $SERVICES
  docker compose up -d
  docker image prune -f >/dev/null
else
  echo "[deploy] nothing to rebuild."
fi
docker compose ps
echo "$CUR" > "$OK_FILE"
rm -f "$FAILED_FILE"
echo "[deploy] $(date '+%F %T') done."
