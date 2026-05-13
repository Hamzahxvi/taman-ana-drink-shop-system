<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $products = Product::where('is_available', true)->get();

        return Inertia::render('menu', [
            'products' => ProductResource::collection($products)->resolve(),
        ]);
    }
}
