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
        $allOrders = Order::with('items')
            ->orderBy('created_at', 'desc')
            ->get();

        $inProgressOrders = $allOrders->whereIn('status', ['pending', 'in-progress'])->values();
        $completedOrders = $allOrders->where('status', 'completed')->values();

        return Inertia::render('admin/orders/index', [
            'inProgressOrders' => OrderResource::collection($inProgressOrders)->resolve(),
            'completedOrders' => OrderResource::collection($completedOrders)->resolve(),
        ]);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, Order $order): RedirectResponse
    {
        $order->update(['status' => $request->validated()['status']]);

        return redirect()->route('admin.orders.index')
            ->with('flash', ['success' => 'Order status updated.']);
    }
}
