<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GardenImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_url' => $this->imageUrl(),
            'caption' => $this->caption,
            'sort_order' => $this->sort_order,
        ];
    }

    private function imageUrl(): string
    {
        if ($this->image_data) {
            return route('garden-images.image', $this->id);
        }

        if (file_exists(public_path($this->image_path))) {
            return asset($this->image_path);
        }

        return asset('storage/'.$this->image_path);
    }
}
