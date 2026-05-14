# Taman Ana - Garden Drink Shop System

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

- **Guest-first design** - no account required to order
- **Self pickup or delivery** - delivery available for Bukit Changgang, Labohan Dagang, Olak Lempit, and RTB
- **Full drink customization** - hot/cold, sweetness level, extras, and special remarks
- **Smart cart** - identical drink configurations are grouped, different variants stay separate
- **One-tap order tracking** - public tracking page for order status updates
- **PDF receipt** - downloadable receipt for every order

### Registered Customers

- **Account with phone number** - registration captures name, email, phone, and password
- **Order history** - in-progress and completed orders with status badges and item breakdowns
- **Print receipts** - download PDF receipts for completed orders

### Staff Panel (`/admin`)

- **Dashboard** - daily stats, popular items, and revenue overview
- **Order management** - view in-progress orders, update status, and view completed orders
- **Menu management** - add, edit, and delete products with icons, categories, images, and per-product extras
- **Extras management** - manage add-ons such as Extra Milk, Oreo Crumbles, and Whipping Cream

### Admin-Only Management

- **Account management** - view, update, and delete customer and staff accounts
- **Role control** - promote customers to staff or change staff back to customer
- **Garden gallery** - upload and manage garden images with captions

---

## Tech Stack

| Layer    | Technology                                                                 |
| -------- | -------------------------------------------------------------------------- |
| Backend  | Laravel 13, PHP 8.4+                                                       |
| Auth     | Laravel Fortify (login, register, password reset, email verification, 2FA) |
| Frontend | React 19, Inertia.js 3, TypeScript                                         |
| Styling  | Tailwind CSS 4, Radix UI primitives                                        |
| Database | SQLite (dev), PostgreSQL (production)                                      |
| PDF      | barryvdh/laravel-dompdf                                                    |
| Testing  | Pest 4                                                                     |
| Tooling  | Vite 8, ESLint, Prettier, Pint                                             |

---

## Default Accounts

| Role     | Email                  | Password   |
| -------- | ---------------------- | ---------- |
| Admin    | `admin@tamanana.com`   | `password` |
| Staff    | `staff@tamanana.com`   | `password` |
| Customer | `customer@example.com` | `password` |

Staff/admin panel: `/admin`

Role access:

- **Admin**: orders, menu, extras, customer/staff account management, garden gallery
- **Staff**: orders, menu, extras
- **Customer**: ordering flow and personal order history

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
composer test         # Clear config, run Pint check, then run Pest
php artisan test      # Run Pest tests
```

---

## Deployment

### Render

1. Push to GitHub.
2. Go to [dashboard.render.com](https://dashboard.render.com), then create a new Blueprint.
3. Connect your repository. Render reads `render.yaml` and creates the web service and PostgreSQL database.
4. Apply the blueprint and wait for the first deploy to complete.

---

## Key Routes

| Method | Path                        | Auth        | Description                                  |
| ------ | --------------------------- | ----------- | -------------------------------------------- |
| GET    | `/`                         | Public      | Landing page with menu, cart, garden gallery |
| POST   | `/orders`                   | Public      | Place a new order                            |
| GET    | `/orders/{id}/track`        | Public      | Track order status                           |
| GET    | `/orders/{id}/receipt`      | Public      | Download PDF receipt                         |
| GET    | `/past-orders`              | Public      | My Orders lookup by phone                    |
| GET    | `/dashboard`                | Auth        | Customer dashboard with menu                 |
| GET    | `/orders`                   | Auth        | Customer in-progress orders                  |
| GET    | `/orders/completed`         | Auth        | Customer completed orders                    |
| GET    | `/login`                    | Guest       | Login page                                   |
| GET    | `/register`                 | Guest       | Registration page                            |
| GET    | `/admin`                    | Admin/Staff | Management dashboard                         |
| GET    | `/admin/orders`             | Admin/Staff | In-progress orders                           |
| GET    | `/admin/orders/completed`   | Admin/Staff | Completed orders                             |
| PATCH  | `/admin/orders/{id}/status` | Admin/Staff | Update order status                          |
| GET    | `/admin/products`           | Admin/Staff | Menu and extras management                   |
| GET    | `/admin/products/create`    | Admin/Staff | Create menu item                             |
| GET    | `/admin/products/{id}/edit` | Admin/Staff | Edit menu item                               |
| POST   | `/admin/extras`             | Admin/Staff | Create extra                                 |
| PUT    | `/admin/extras/{id}`        | Admin/Staff | Update extra                                 |
| DELETE | `/admin/extras/{id}`        | Admin/Staff | Delete extra                                 |
| GET    | `/admin/users`              | Admin       | Customer/staff account management            |
| PUT    | `/admin/users/{id}`         | Admin       | Update customer/staff account                |
| DELETE | `/admin/users/{id}`         | Admin       | Delete customer/staff account                |
| GET    | `/admin/garden`             | Admin       | Garden gallery management                    |

---

## Contact

- **Location**: Lot 12260 Jalan Perak Kanan, Bukit Changgang, 42700 Banting, Selangor
- **WhatsApp**: [wa.me/601131791108](https://wa.me/601131791108)
- **Phone**: +60 11-3179 1108
