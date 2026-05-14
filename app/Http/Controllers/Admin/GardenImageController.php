<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGardenImageRequest;
use App\Http\Resources\GardenImageResource;
use App\Models\GardenImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GardenImageController extends Controller
{
    public function index()
    {
        $images = GardenImage::orderBy('sort_order')->get();

        return Inertia::render('admin/garden/index', [
            'images' => GardenImageResource::collection($images)->resolve(),
        ]);
    }

    public function store(StoreGardenImageRequest $request): RedirectResponse
    {
        $image = $request->file('image');
        $path = $image->store('images/garden', 'public');

        GardenImage::create([
            'image_path' => $path,
            'image_data' => base64_encode(file_get_contents($image->getRealPath())),
            'image_mime_type' => $image->getMimeType(),
            'caption' => $request->input('caption'),
            'sort_order' => $request->input('sort_order', 0),
        ]);

        return redirect()->route('admin.garden.index')
            ->with('flash', ['success' => 'Image uploaded successfully.']);
    }

    public function update(Request $request, GardenImage $gardenImage): RedirectResponse
    {
        $validated = $request->validate([
            'caption' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $gardenImage->update($validated);

        return redirect()->route('admin.garden.index')
            ->with('flash', ['success' => 'Image updated successfully.']);
    }

    public function destroy(GardenImage $gardenImage): RedirectResponse
    {
        Storage::disk('public')->delete($gardenImage->image_path);
        $gardenImage->delete();

        return redirect()->route('admin.garden.index')
            ->with('flash', ['success' => 'Image deleted successfully.']);
    }

    public function image(GardenImage $gardenImage): Response
    {
        if ($gardenImage->image_data) {
            return response(base64_decode($gardenImage->image_data), 200, [
                'Cache-Control' => 'public, max-age=31536000',
                'Content-Type' => $gardenImage->image_mime_type ?? 'image/jpeg',
            ]);
        }

        $publicPath = public_path($gardenImage->image_path);

        if (file_exists($publicPath)) {
            return response()->file($publicPath);
        }

        $storagePath = storage_path('app/public/'.$gardenImage->image_path);

        if (file_exists($storagePath)) {
            return response()->file($storagePath);
        }

        abort(404);
    }
}
