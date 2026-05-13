<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'unit_price' => (float) $this->unit_price,
            'quantity' => $this->quantity,
            'subtotal' => (float) $this->subtotal,
            'temperature' => $this->temperature,
            'sweetness' => $this->sweetness,
            'extra_milk' => (bool) $this->extra_milk,
            'toppings' => $this->toppings,
            'remark' => $this->remark,
        ];
    }
}
