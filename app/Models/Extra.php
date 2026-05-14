<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    protected $fillable = ['name', 'slug', 'price', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:2',
        ];
    }
}
