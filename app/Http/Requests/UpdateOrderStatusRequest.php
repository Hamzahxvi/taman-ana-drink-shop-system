<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->canAccessManagement() ?? false;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,in-progress,completed',
        ];
    }
}
