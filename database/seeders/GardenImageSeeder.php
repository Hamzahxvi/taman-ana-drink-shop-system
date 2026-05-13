<?php

namespace Database\Seeders;

use App\Models\GardenImage;
use Illuminate\Database\Seeder;

class GardenImageSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            [
                'image_path' => 'images/garden/6062319250405266278.jpg',
                'caption' => 'Taman Ana — where nature meets comfort',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'image_path' => 'images/garden/6062319250405266279.jpg',
                'caption' => 'Lush greenery surrounds our peaceful garden',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'image_path' => 'images/garden/6062319250405266280.jpg',
                'caption' => 'The perfect spot to unwind with a drink',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($images as $image) {
            GardenImage::updateOrCreate(
                ['image_path' => $image['image_path']],
                $image,
            );
        }
    }
}
