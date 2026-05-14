<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExtraResource;
use App\Models\Extra;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ExtraController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/extras/index', [
            'extras' => ExtraResource::collection(Extra::orderBy('name')->get())->resolve(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
        ]);

        Extra::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'price' => $validated['price'],
            'is_active' => true,
        ]);

        return redirect()->route('admin.extras.index')
            ->with('flash', ['success' => 'Extra added.']);
    }

    public function update(Request $request, Extra $extra)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $extra->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? $extra->is_active,
        ]);

        return redirect()->route('admin.extras.index')
            ->with('flash', ['success' => 'Extra updated.']);
    }

    public function destroy(Extra $extra)
    {
        $extra->delete();

        return redirect()->route('admin.extras.index')
            ->with('flash', ['success' => 'Extra deleted.']);
    }
}
