#!/bin/bash
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -n "$RENDER_EXTERNAL_URL" ]; then
    sed -i "s|^APP_URL=.*|APP_URL=$RENDER_EXTERNAL_URL|" .env
elif [ -n "$APP_URL" ]; then
    sed -i "s|^APP_URL=.*|APP_URL=$APP_URL|" .env
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    php artisan key:generate --force
fi

touch database/database.sqlite

php artisan migrate --force
php artisan db:seed --force --class=DatabaseSeeder
php artisan storage:link --force

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
