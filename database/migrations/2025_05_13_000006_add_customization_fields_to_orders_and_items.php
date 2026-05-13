<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_type')->default('pickup')->after('table_number');
            $table->string('customer_address')->nullable()->after('order_type');
            $table->string('delivery_area')->nullable()->after('customer_address');
            $table->string('payment_method')->nullable()->after('delivery_area');
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->string('temperature')->default('hot')->after('subtotal');
            $table->string('sweetness')->default('regular')->after('temperature');
            $table->boolean('extra_milk')->default(false)->after('sweetness');
            $table->json('toppings')->nullable()->after('extra_milk');
            $table->text('remark')->nullable()->after('toppings');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['order_type', 'customer_address', 'delivery_area', 'payment_method']);
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn(['temperature', 'sweetness', 'extra_milk', 'toppings', 'remark']);
        });
    }
};
