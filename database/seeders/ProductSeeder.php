<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Americano',
                'slug' => 'americano',
                'description' => 'Rich, bold espresso shot pulled over hot water — pure simplicity.',
                'price' => 5.00,
                'icon' => '☕',
                'category' => 'Coffee',
            ],
            [
                'name' => 'Mocha',
                'slug' => 'mocha',
                'description' => 'Espresso meets steamed milk and velvety chocolate — a hug in a cup.',
                'price' => 5.00,
                'icon' => '🍫',
                'category' => 'Coffee',
            ],
            [
                'name' => 'Tea',
                'slug' => 'tea',
                'description' => 'Classic brewed tea, served hot or iced — timeless and soothing.',
                'price' => 5.00,
                'icon' => '🍃',
                'category' => 'Tea',
            ],
            [
                'name' => 'Milk Tea',
                'slug' => 'milk-tea',
                'description' => 'Creamy black tea blended with smooth milk — a comforting classic.',
                'price' => 5.00,
                'icon' => '🥛',
                'category' => 'Tea',
            ],
            [
                'name' => 'Green Tea',
                'slug' => 'green-tea',
                'description' => 'Delicate Japanese-style green tea — earthy, fresh, and calming.',
                'price' => 5.00,
                'icon' => '🍵',
                'category' => 'Tea',
            ],
            [
                'name' => 'Matcha',
                'slug' => 'matcha',
                'description' => 'Premium stone-ground matcha whisked to perfection — vibrant and energising.',
                'price' => 5.00,
                'icon' => '🍵',
                'category' => 'Tea',
            ],
            [
                'name' => 'Hazelnut Coffee',
                'slug' => 'hazelnut-coffee',
                'description' => 'Smooth espresso with a toasted hazelnut twist — nutty, sweet, irresistible.',
                'price' => 5.00,
                'icon' => '🌰',
                'category' => 'Coffee',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product,
            );
        }
    }
}
