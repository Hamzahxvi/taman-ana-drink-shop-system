<?php

namespace Database\Seeders;

use App\Models\GardenImage;
use Illuminate\Database\Seeder;

class GardenImageSeeder extends Seeder
{
    public function run(): void
    {
        GardenImage::whereIn('image_path', [
            'images/garden/6062319250405266278.jpg',
            'images/garden/6062319250405266279.jpg',
            'images/garden/6062319250405266280.jpg',
        ])->delete();
    }
}
