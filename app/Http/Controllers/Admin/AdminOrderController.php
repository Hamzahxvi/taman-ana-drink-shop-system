<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')
            ->whereIn('status', ['pending', 'in-progress'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/orders/index', [
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }

    public function completed()
    {
        $orders = Order::with('items')
            ->where('status', 'completed')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/orders/completed', [
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, Order $order): RedirectResponse
    {
        $order->update(['status' => $request->validated()['status']]);

        return redirect()->route('admin.orders.index')
            ->with('flash', ['success' => 'Order status updated.']);
    }
}
