<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'customer_contact' => $this->customer_contact,
            'pickup_time' => $this->pickup_time,
            'table_number' => $this->table_number,
            'order_type' => $this->order_type,
            'customer_address' => $this->customer_address,
            'delivery_area' => $this->delivery_area,
            'payment_method' => $this->payment_method,
            'status' => $this->status,
            'total_price' => (float) $this->total_price,
            'notes' => $this->notes,
            'items' => $this->whenLoaded('items', function () {
                return OrderItemResource::collection($this->items)->resolve();
            }, []),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
