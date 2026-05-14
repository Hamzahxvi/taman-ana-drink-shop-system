<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ExtraResource;
use App\Http\Resources\ProductResource;
use App\Models\Extra;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        $extras = Extra::orderBy('name')->get();

        return Inertia::render('admin/products/index', [
            'products' => ProductResource::collection($products)->resolve(),
            'extras' => ExtraResource::collection($extras)->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/form', [
            'product' => null,
            'extras' => ExtraResource::collection(Extra::orderBy('name')->get())->resolve(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);
        $product->extras()->sync($request->input('extra_ids', []));

        return redirect()->route('admin.products.index')
            ->with('flash', ['success' => 'Product created successfully.']);
    }

    public function edit(Product $product)
    {
        $product->load('extras');

        return Inertia::render('admin/products/form', [
            'product' => (new ProductResource($product))->resolve(),
            'extras' => ExtraResource::collection(Extra::orderBy('name')->get())->resolve(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);
        $product->extras()->sync($request->input('extra_ids', []));

        return redirect()->route('admin.products.index')
            ->with('flash', ['success' => 'Product updated successfully.']);
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('flash', ['success' => 'Product deleted successfully.']);
    }
}
