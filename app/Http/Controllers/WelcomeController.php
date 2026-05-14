<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExtraResource;
use App\Http\Resources\GardenImageResource;
use App\Http\Resources\ProductResource;
use App\Models\Extra;
use App\Models\GardenImage;
use App\Models\Product;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function index()
    {
        $products = Product::where('is_available', true)
            ->with(['extras' => fn ($q) => $q->where('is_active', true)->orderBy('name')])
            ->get();
        $gardenImages = GardenImage::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'products' => ProductResource::collection($products)->resolve(),
            'gardenImages' => GardenImageResource::collection($gardenImages)->resolve(),
            'extras' => ExtraResource::collection(Extra::where('is_active', true)->orderBy('name')->get())->resolve(),
        ]);
    }

    public function dashboard()
    {
        $products = Product::where('is_available', true)
            ->with(['extras' => fn ($q) => $q->where('is_active', true)->orderBy('name')])
            ->get();
        $gardenImages = GardenImage::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('dashboard', [
            'products' => ProductResource::collection($products)->resolve(),
            'gardenImages' => GardenImageResource::collection($gardenImages)->resolve(),
            'extras' => ExtraResource::collection(Extra::where('is_active', true)->orderBy('name')->get())->resolve(),
        ]);
    }
}
