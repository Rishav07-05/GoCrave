<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->foreignId('restaurant_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('pending');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('delivery_fee', 8, 2)->default(0);
            $table->string('delivery_address');
            $table->text('notes')->nullable();
            $table->string('estimated_delivery_time')->nullable();
            $table->decimal('driver_latitude', 10, 7)->nullable();
            $table->decimal('driver_longitude', 10, 7)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
