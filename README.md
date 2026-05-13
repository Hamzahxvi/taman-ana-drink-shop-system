# Taman Ana — Garden Drink Shop System

A full-stack drink ordering system for **Taman Ana**, a garden-themed beverage shop in Bukit Changgang, Banting, Selangor. Built for a seamless guest-first ordering experience with in-store pickup, local delivery, and real-time order tracking.

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Inertia-3.x-9553E9" alt="Inertia.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Tests-Pest%204-7A5DFF" alt="Pest">
</p>

---

## Features

### Customer Ordering Flow
- **Guest-first design** — No account required to order
- **Self Pickup or Delivery** — Delivery available for Bukit Changgang, Labohan Dagang, Olak Lempit, RTB
- **Full drink customization** — Hot/Cold, sweetness level, extra milk (+RM0.50), oreo crumbles (+RM0.50), whipping cream (+RM0.50), special remarks per item
- **Smart cart** — Identical drink configurations are grouped, different variants stay separate
- **Order type & payment** — Choose pickup/delivery, pay via Online Banking/DuitNow or Cash
- **One-tap order tracking** — After ordering, a persistent "My Orders" button appears showing active & past orders
- **PDF receipt** — Downloadable receipt for every order

### Registered Customers
- **Account with phone number** — Registration captures name, email, phone, password
- **Auto-fill checkout** — Name and phone pre-filled from account; toggle to use registered or different phone
- **Order history** — All past orders with status badges and full item breakdowns

### Admin Panel (`/admin`)
- **Dashboard** — Daily stats, popular items, revenue
- **Menu management** — Add/edit/delete products with emoji icons, categories, images
- **Order management** — View all orders with full customization details, update status (Pending → Preparing → Completed)
- **Garden gallery** — Upload and manage garden images with captions

### Order Tracking
- **Public tracking page** — `/orders/{id}/track` shows real-time status, all item details, PDF download
- **My Orders page** — `/past-orders` auto-looks up orders by saved phone number, split into Active & Past sections

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.3+ |
| Auth | Laravel Fortify (login, register, 2FA, email verification) |
| Frontend | React 19, Inertia.js 3, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui (Radix primitives) |
| Database | SQLite (dev), MySQL/PostgreSQL (production) |
| PDF | barryvdh/laravel-dompdf |
| Testing | Pest 4 (40 tests, 136 assertions) |
| Tooling | Vite 8, ESLint, Prettier, Pint |

---

## Default Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@tamanana.com` | `password` |
| Customer | `customer@example.com` | `password` |

Admin panel: `/admin`

---

## Local Development

### Prerequisites
- PHP 8.3+
- Composer
- Node.js 18+
- SQLite (default) or MySQL

### Setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/taman-ana.git
cd taman-ana

# Install dependencies
composer install
npm install

# Configure environment
cp .env.example .env
php artisan key:generate

# Run migrations and seed
php artisan migrate --seed

# Create storage symlink
php artisan storage:link

# Build frontend
npm run build

# Start dev server
composer dev
```

The app will be available at `http://localhost:8000`.

### Useful Commands

```bash
composer dev          # Laravel + queue + Vite concurrently
npm run build         # Production frontend build
npm run types:check   # TypeScript static check
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
composer ci:check     # Full CI: lint + format + types + tests
php artisan test      # Run Pest tests
```

---

## Deployment

### Production Checklist

1. **Server requirements**: PHP 8.3+, MySQL 5.7+ / PostgreSQL, Node.js, Composer
2. **Point web root** to `public/` directory
3. **Set environment variables** in `.env`:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-domain.com
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=taman_ana
   DB_USERNAME=your_user
   DB_PASSWORD=your_password
   SESSION_DRIVER=database
   CACHE_STORE=database
   QUEUE_CONNECTION=database
   ```
4. **Deploy commands**:
   ```bash
   composer install --no-dev --optimize-autoloader
   npm ci
   npm run build
   php artisan migrate --seed --force
   php artisan storage:link
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
5. **SSL**: Configure Let's Encrypt or Cloudflare for HTTPS
6. **Queue worker**: Run `php artisan queue:work` as a daemon for background jobs
7. **Scheduler**: Add `* * * * * php /path/to/artisan schedule:run` to cron

### Deploy to Laravel Forge (Recommended)

[Laravel Forge](https://forge.laravel.com) handles server provisioning, deployment, SSL, queues, and scheduling automatically. Connect your GitHub repo, add `.env` values, and deploy with one click.

### Deploy to Shared Hosting (cPanel)

1. Upload all files to your hosting
2. Set `public/` as the document root (or create a symlink)
3. Update `.env` with hosting database credentials
4. Run deployment commands via SSH or cron

---

## Project Structure

```
taman-ana/
├── app/
│   ├── Actions/Fortify/        # Auth actions (CreateNewUser, ResetPassword)
│   ├── Http/
│   │   ├── Controllers/        # OrderController, WelcomeController, Admin controllers
│   │   ├── Middleware/          # HandleInertiaRequests, AdminMiddleware
│   │   ├── Requests/           # Form request validation
│   │   └── Resources/          # API resource transformers
│   └── Models/                 # User, Product, Order, OrderItem, GardenImage
├── database/
│   ├── migrations/             # Database schema
│   └── seeders/                # Default data (admin, products, garden images)
├── resources/
│   ├── js/
│   │   ├── components/         # React components (cart, drink cards, hero)
│   │   ├── contexts/           # CartContext with variant-aware cart
│   │   ├── layouts/            # Page layouts (app, auth, settings)
│   │   ├── pages/              # Inertia page components
│   │   └── types/              # TypeScript type definitions
│   └── views/                  # Blade templates (app, receipt)
├── routes/
│   ├── web.php                 # Public + auth + admin routes
│   └── settings.php            # Profile & security routes
└── tests/                      # Pest tests
```

---

## Key Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Landing page with menu, cart, garden gallery |
| POST | `/orders` | Public | Place a new order |
| GET | `/orders/{id}/track` | Public | Track order status |
| GET | `/orders/{id}/receipt` | Public | Download PDF receipt |
| GET | `/past-orders` | Public | My Orders (lookup by phone) |
| GET | `/orders` | Auth | Order history for logged-in users |
| GET | `/login` | Guest | Login page |
| GET | `/register` | Guest | Registration page |
| GET | `/admin` | Admin | Admin dashboard |
| GET | `/admin/products` | Admin | Menu management |
| GET | `/admin/orders` | Admin | Order management |
| GET | `/admin/garden` | Admin | Garden gallery management |

---

## Contact

- **Location**: Lot 12260 Jalan Perak Kanan, Bukit Changgang, 42700 Banting, Selangor
- **Coordinates**: 2°48'58.6"N 101°38'05.4"E
- **WhatsApp**: [wa.me/601131791108](https://wa.me/601131791108)
- **Phone**: +60 11-3179 1108

---

## License

This project is proprietary software developed for Taman Ana.
