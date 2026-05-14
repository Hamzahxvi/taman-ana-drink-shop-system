<?php

namespace Database\Seeders;

use App\Models\Extra;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@tamanana.com'],
            [
                'name' => 'Puan Ana',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
        );

        User::updateOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Test Customer',
                'password' => Hash::make('password'),
                'role' => 'customer',
            ],
        );

        User::updateOrCreate(
            ['email' => 'staff@tamanana.com'],
            [
                'name' => 'Taman Ana Staff',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
        );

        foreach ($this->extras() as $extra) {
            Extra::updateOrCreate(
                ['slug' => $extra['slug']],
                $extra,
            );
        }

        $this->call([
            ProductSeeder::class,
            GardenImageSeeder::class,
        ]);
    }

    /**
     * @return array<int, array{name: string, slug: string, price: float, is_active: bool}>
     */
    private function extras(): array
    {
        return [
            [
                'name' => 'Extra Milk',
                'slug' => 'extra-milk',
                'price' => 0.50,
                'is_active' => true,
            ],
            [
                'name' => 'Oreo Crumbles',
                'slug' => 'oreo-crumbles',
                'price' => 0.50,
                'is_active' => true,
            ],
            [
                'name' => 'Whipping Cream',
                'slug' => 'whipping-cream',
                'price' => 0.50,
                'is_active' => true,
            ],
        ];
    }
}
