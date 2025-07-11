#!/bin/bash

DOCKER="$(which docker)"
DIR="$(dirname $(pwd))"

# Cronjob line with local path to LoLdle-bot
CRON_LINE="0 0 * * * cd $DIR && $DOCKER compose run --rm cronjob >> $(pwd)/cronjob.log 2>&1"

echo "$CRON_LINE" > "cronfile"

# Add file to crontab. WARNING: This will overwrite existing cronjobs
crontab cronfile
