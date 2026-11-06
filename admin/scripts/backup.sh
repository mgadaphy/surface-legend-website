#!/usr/bin/env bash
# Nightly backup of the admin's database and uploaded images. Keeps 14 days.
#   cron: 45 2 * * * /home/gadaphy/projects/surface-legend-website/admin/scripts/backup.sh >> /home/gadaphy/projects/surface-legend-website/scripts/backup.log 2>&1
# Restore the database: gunzip -c <file>.sql.gz | docker exec -i surface-legend-db psql -U surfacelegend surfacelegend
set -euo pipefail
DIR="$HOME/backups/surface-legend"; KEEP_DAYS=14; STAMP="$(date +%F_%H-%M)"
mkdir -p "$DIR"
docker exec surface-legend-db pg_dump -U surfacelegend --clean --if-exists surfacelegend | gzip > "$DIR/db_$STAMP.sql.gz"
docker run --rm -v surface-legend-website_media:/media:ro -v "$DIR":/out alpine tar czf "/out/media_$STAMP.tar.gz" -C /media .
find "$DIR" -name "*.gz" -mtime +"$KEEP_DAYS" -delete
echo "[backup] $(date '+%F %T') ok: $(du -sh "$DIR" | cut -f1) in $DIR"
