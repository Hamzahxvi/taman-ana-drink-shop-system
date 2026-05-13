<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true),
            'slug' => fake()->unique()->slug(2),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 5, 20),
            'icon' => fake()->randomElement(['☕', '🍫', '🍃', '🥛', '🍵', '🌰']),
            'category' => fake()->randomElement(['Coffee', 'Tea', 'Special']),
            'is_available' => true,
        ];
    }
}
