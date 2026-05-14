<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('garden_images')
            ->whereIn('image_path', [
                'images/garden/6062319250405266278.jpg',
                'images/garden/6062319250405266279.jpg',
                'images/garden/6062319250405266280.jpg',
            ])
            ->orWhereIn('caption', [
                'Taman Ana — where nature meets comfort',
                'Taman Ana â€” where nature meets comfort',
                'Lush greenery surrounds our peaceful garden',
                'The perfect spot to unwind with a drink',
            ])
            ->delete();
    }

    public function down(): void
    {
        //
    }
};
