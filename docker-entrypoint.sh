#!/bin/bash
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    php artisan key:generate --force
fi

php artisan migrate --force

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
