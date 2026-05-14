<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'icon' => $this->icon,
            'image' => $this->image ? asset('storage/'.$this->image) : null,
            'category' => $this->category,
            'is_available' => $this->is_available,
        ];

        if ($this->relationLoaded('extras')) {
            $data['extra_ids'] = $this->extras->pluck('id')->toArray();
        }

        return $data;
    }
}
