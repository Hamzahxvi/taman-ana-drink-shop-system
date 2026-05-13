<?php

namespace App\Http\Controllers;

use App\Http\Resources\GardenImageResource;
use App\Http\Resources\ProductResource;
use App\Models\GardenImage;
use App\Models\Product;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function index()
    {
        $products = Product::where('is_available', true)->get();
        $gardenImages = GardenImage::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'products' => ProductResource::collection($products)->resolve(),
            'gardenImages' => GardenImageResource::collection($gardenImages)->resolve(),
        ]);
    }
}
