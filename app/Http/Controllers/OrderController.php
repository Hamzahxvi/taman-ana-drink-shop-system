<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $totalPrice = 0;
        $items = [];

        foreach ($validated['items'] as $itemData) {
            $product = Product::findOrFail($itemData['product_id']);

            $subtotal = $itemData['unit_price'] * $itemData['quantity'];
            $totalPrice += $subtotal;

            $items[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'unit_price' => $itemData['unit_price'],
                'quantity' => $itemData['quantity'],
                'subtotal' => $subtotal,
                'temperature' => $itemData['temperature'],
                'sweetness' => $itemData['sweetness'],
                'extra_milk' => $itemData['extra_milk'] ?? false,
                'toppings' => $itemData['toppings'] ?? [],
                'remark' => $itemData['remark'] ?? null,
            ];
        }

        $order = Order::create([
            'user_id' => $request->user()?->id,
            'customer_name' => $validated['customer_name'],
            'customer_contact' => $validated['customer_contact'],
            'pickup_time' => $validated['pickup_time'] ?? null,
            'table_number' => $validated['table_number'] ?? null,
            'order_type' => $validated['order_type'],
            'customer_address' => $validated['customer_address'] ?? null,
            'delivery_area' => $validated['delivery_area'] ?? null,
            'payment_method' => $validated['payment_method'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
            'total_price' => $totalPrice,
        ]);

        $order->items()->createMany($items);

        return redirect()->route('orders.track', ['order' => $order->id])->with('flash', [
            'success' => 'Your order has been placed! You can track its status below.',
        ]);
    }

    public function track(Request $request, Order $order)
    {
        $order->load('items');

        return Inertia::render('order-track', [
            'trackOrder' => (new OrderResource($order))->resolve(),
        ]);
    }

    public function receipt(Order $order)
    {
        $order->load('items');

        $pdf = Pdf::loadView('receipt', [
            'order' => $order,
        ]);

        return $pdf->download('receipt-order-'.$order->id.'.pdf');
    }

    public function lookup(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:50',
        ]);

        $phone = $request->query('phone');
        $clean = preg_replace('/[^0-9]/', '', $phone);

        if (str_starts_with($clean, '60')) {
            $local = '0'.substr($clean, 2);
            $intl = '+'.$clean;
        } elseif (str_starts_with($clean, '0')) {
            $local = $clean;
            $intl = '+60'.substr($clean, 1);
        } else {
            $local = '0'.$clean;
            $intl = '+60'.$clean;
        }

        $orders = Order::with('items')
            ->where(function ($q) use ($clean, $local, $intl) {
                $q->where('customer_contact', $clean)
                    ->orWhere('customer_contact', $local)
                    ->orWhere('customer_contact', $intl);
            })
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }

    public function history(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['pending', 'in-progress'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('orders', [
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }

    public function completedOrders(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('orders-completed', [
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }
}
