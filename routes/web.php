<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExtraController;
use App\Http\Controllers\Admin\GardenImageController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('/build/{path}', function ($path) {
    $file = public_path('build/'.$path);

    if (! file_exists($file)) {
        abort(404);
    }

    $contentTypes = [
        'css' => 'text/css',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
        'jpg' => 'image/jpeg',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'png' => 'image/png',
        'svg' => 'image/svg+xml',
        'wasm' => 'application/wasm',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
    ];

    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

    return response()->file($file, [
        'Content-Type' => $contentTypes[$extension] ?? 'application/octet-stream',
    ]);
})->where('path', '.*');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order}/track', [OrderController::class, 'track'])->name('orders.track');
Route::get('/orders/{order}/receipt', [OrderController::class, 'receipt'])->name('orders.receipt');
Route::get('/orders/lookup', [OrderController::class, 'lookup'])->name('orders.lookup');
Route::inertia('past-orders', 'past-orders')->name('past-orders');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/orders', [OrderController::class, 'history'])->name('orders.history');
    Route::get('/orders/completed', [OrderController::class, 'completedOrders'])->name('orders.completed');
    Route::get('dashboard', [WelcomeController::class, 'dashboard'])->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/completed', [AdminOrderController::class, 'completed'])->name('orders.completed');
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');

    Route::get('/garden', [GardenImageController::class, 'index'])->name('garden.index');
    Route::post('/garden', [GardenImageController::class, 'store'])->name('garden.store');
    Route::post('/garden/{gardenImage}', [GardenImageController::class, 'update'])->name('garden.update');
    Route::delete('/garden/{gardenImage}', [GardenImageController::class, 'destroy'])->name('garden.destroy');

    Route::post('/extras', [ExtraController::class, 'store'])->name('extras.store');
    Route::put('/extras/{extra}', [ExtraController::class, 'update'])->name('extras.update');
    Route::delete('/extras/{extra}', [ExtraController::class, 'destroy'])->name('extras.destroy');
});

require __DIR__.'/settings.php';
