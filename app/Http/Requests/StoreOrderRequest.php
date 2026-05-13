<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_contact' => 'required|string|max:50',
            'order_type' => 'required|string|in:pickup,delivery',
            'delivery_area' => 'required_if:order_type,delivery|nullable|string|in:Bukit Changgang,Labohan Dagang,Olak Lempit,RTB',
            'customer_address' => 'required_if:order_type,delivery|nullable|string|max:500',
            'pickup_time' => 'nullable|string|max:100',
            'table_number' => 'nullable|string|max:20',
            'payment_method' => 'required|string|in:duitnow,cash',
            'notes' => 'nullable|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1|max:100',
            'items.*.temperature' => 'required|string|in:hot,cold',
            'items.*.sweetness' => 'required|string|in:regular,less,none',
            'items.*.extra_milk' => 'required|boolean',
            'items.*.toppings' => 'nullable|array',
            'items.*.toppings.*' => 'string|in:oreo_crumbles,whipping_cream',
            'items.*.remark' => 'nullable|string|max:500',
            'items.*.unit_price' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'customer_name.required' => 'Please provide your name.',
            'customer_contact.required' => 'Please provide your phone number.',
            'order_type.required' => 'Please select pickup or delivery.',
            'delivery_area.required_if' => 'Please select your delivery area.',
            'delivery_area.in' => 'Delivery is only available for Bukit Changgang, Labohan Dagang, Olak Lempit, and RTB.',
            'customer_address.required_if' => 'Please provide your delivery address.',
            'payment_method.required' => 'Please select a payment method.',
            'items.required' => 'Please add at least one item to your order.',
            'items.*.product_id.exists' => 'One or more products are no longer available.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',
        ];
    }
}
