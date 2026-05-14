#!/bin/bash
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    php artisan key:generate --force
fi

php artisan migrate --force

php artisan tinker --execute="
if (\App\Models\Extra::count() === 0) {
    \App\Models\Extra::insert([
        ['name' => 'Extra Milk', 'slug' => 'extra-milk', 'price' => 0.50, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ['name' => 'Oreo Crumbles', 'slug' => 'oreo-crumbles', 'price' => 0.50, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ['name' => 'Whipping Cream', 'slug' => 'whipping-cream', 'price' => 0.50, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
    ]);
}
"

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
