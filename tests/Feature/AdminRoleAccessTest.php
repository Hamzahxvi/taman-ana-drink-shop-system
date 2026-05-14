<?php

use App\Models\Product;
use App\Models\User;

test('staff can view orders and manage menu', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);
    $product = Product::factory()->create();

    $this->actingAs($staff)
        ->get(route('admin.orders.index'))
        ->assertOk();

    $this->actingAs($staff)
        ->get(route('admin.products.index'))
        ->assertOk();

    $this->actingAs($staff)
        ->put(route('admin.products.update', $product), [
            'name' => 'Updated Drink',
            'description' => $product->description,
            'price' => 8.50,
            'icon' => $product->icon,
            'category' => $product->category,
            'is_available' => true,
        ])
        ->assertRedirect(route('admin.products.index'));

    expect($product->refresh()->name)->toBe('Updated Drink');
});

test('staff cannot manage accounts or garden gallery', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->get(route('admin.users.index'))
        ->assertForbidden();

    $this->actingAs($staff)
        ->get(route('admin.garden.index'))
        ->assertForbidden();
});

test('admin can update and delete customer and staff accounts', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $customer = User::factory()->create([
        'role' => 'customer',
    ]);
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertOk();

    $this->actingAs($admin)
        ->put(route('admin.users.update', $customer), [
            'name' => 'Counter Staff',
            'email' => 'counter@example.com',
            'phone' => '0123456789',
            'role' => 'staff',
        ])
        ->assertRedirect(route('admin.users.index'));

    expect($customer->refresh()->role)->toBe('staff');
    expect($customer->name)->toBe('Counter Staff');

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $staff))
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseMissing('users', [
        'id' => $staff->id,
    ]);
});

test('admin cannot update or delete admin accounts from account management', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $otherAdmin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.users.update', $otherAdmin), [
            'name' => 'Changed Admin',
            'email' => 'changed-admin@example.com',
            'phone' => null,
            'role' => 'staff',
        ])
        ->assertNotFound();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $otherAdmin))
        ->assertNotFound();

    expect($otherAdmin->refresh()->role)->toBe('admin');
});
