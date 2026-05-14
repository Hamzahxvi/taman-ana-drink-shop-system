<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\User;

test('a customer can place an order with multiple customized items', function () {
    $user = User::factory()->create([
        'name' => 'Aina Customer',
        'phone' => '0123456789',
    ]);
    $kopi = Product::factory()->create([
        'name' => 'Kopi Susu',
        'price' => 4.50,
    ]);
    $chocolate = Product::factory()->create([
        'name' => 'Chocolate Ice',
        'price' => 6.00,
    ]);

    $response = $this
        ->actingAs($user)
        ->post(route('orders.store'), [
            'customer_name' => 'Aina Customer',
            'customer_contact' => '0123456789',
            'order_type' => 'pickup',
            'payment_method' => 'cash',
            'items' => [
                [
                    'product_id' => $kopi->id,
                    'quantity' => 1,
                    'temperature' => 'hot',
                    'sweetness' => 'regular',
                    'extra_milk' => true,
                    'toppings' => [],
                    'remark' => null,
                    'unit_price' => 5.00,
                ],
                [
                    'product_id' => $chocolate->id,
                    'quantity' => 2,
                    'temperature' => 'cold',
                    'sweetness' => 'less',
                    'extra_milk' => false,
                    'toppings' => ['oreo-crumbles', 'whipping-cream'],
                    'remark' => 'Less ice',
                    'unit_price' => 7.00,
                ],
            ],
        ]);

    $order = Order::query()->with('items')->firstOrFail();

    $response->assertRedirect(route('orders.track', ['order' => $order->id]));
    expect($order->items)->toHaveCount(2);
    expect((float) $order->total_price)->toBe(19.0);
    expect($order->items[1]->toppings)->toBe(['oreo_crumbles', 'whipping_cream']);
});
