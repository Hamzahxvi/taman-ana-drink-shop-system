# Taman Ana — Garden Drink Shop System

A full-stack drink ordering system for **Taman Ana**, a garden-themed beverage shop in Bukit Changgang, Banting, Selangor.

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
- **Full drink customization** — Hot/Cold, sweetness level, extras (admin-managed add-ons), special remarks
- **Smart cart** — Identical drink configurations are grouped, different variants stay separate
- **One-tap order tracking** — Real-time order status updates via public tracking page
- **PDF receipt** — Downloadable receipt for every order

### Registered Customers
- **Account with phone number** — Registration captures name, email, phone, password
- **Order history** — In-progress and completed orders with status badges and full item breakdowns
- **Print receipts** — Download PDF receipts for completed orders

### Admin Panel (`/admin`)
- **Dashboard** — Daily stats, popular items, revenue overview
- **Order management** — View in-progress orders, update status (Pending → In Progress → Completed), separate completed orders page
- **Menu management** — Add/edit/delete products with emoji icons, categories, images, and per-product extras
- **Extras management** — Manage add-ons (Extra Milk, Oreo Crumbles, Whipping Cream) with pricing — integrated into the menu page
- **Garden gallery** — Upload and manage garden images with captions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.4+ |
| Auth | Laravel Fortify (login, register, password reset, email verification, 2FA) |
| Frontend | React 19, Inertia.js 3, TypeScript |
| Styling | Tailwind CSS 4, Radix UI primitives |
| Database | SQLite (dev), PostgreSQL (production) |
| PDF | barryvdh/laravel-dompdf |
| Testing | Pest 4 |
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
- PHP 8.4+
- Composer
- Node.js 18+
- SQLite

### Setup

```bash
git clone https://github.com/Hamzahxvi/taman-ana-drink-shop-system.git
cd taman-ana-drink-shop-system

composer install
npm install

cp .env.example .env
php artisan key:generate

php artisan migrate --seed
php artisan storage:link

npm run build

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

### Render (Free)

1. Push to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com) → New → Blueprint
3. Connect your repo — Render reads `render.yaml` and auto-creates:
   - Web Service (Docker, PHP 8.4 + Apache)
   - PostgreSQL database (free tier)
4. Click Apply — first deploy takes ~5 minutes

---

## Key Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Landing page with menu, cart, garden gallery |
| POST | `/orders` | Public | Place a new order |
| GET | `/orders/{id}/track` | Public | Track order status |
| GET | `/orders/{id}/receipt` | Public | Download PDF receipt |
| GET | `/past-orders` | Public | My Orders (lookup by phone) |
| GET | `/dashboard` | Auth | Customer dashboard with menu |
| GET | `/orders` | Auth | In-progress orders |
| GET | `/orders/completed` | Auth | Completed orders with receipt download |
| GET | `/login` | Guest | Login page |
| GET | `/register` | Guest | Registration page |
| GET | `/admin` | Admin | Admin dashboard |
| GET | `/admin/orders` | Admin | In-progress orders |
| GET | `/admin/orders/completed` | Admin | Completed orders |
| GET | `/admin/products` | Admin | Menu + extras management |
| GET | `/admin/garden` | Admin | Garden gallery management |

---

## Contact

- **Location**: Lot 12260 Jalan Perak Kanan, Bukit Changgang, 42700 Banting, Selangor
- **WhatsApp**: [wa.me/601131791108](https://wa.me/601131791108)
- **Phone**: +60 11-3179 1108
