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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->text('description')->nullable();
            $table->string('cuisine_type');
            $table->string('address');
            $table->string('phone')->nullable();
            $table->string('image_url')->nullable();
            $table->string('cover_image_url')->nullable();
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('delivery_time')->default('30-45 min');
            $table->decimal('delivery_fee', 8, 2)->default(2.99);
            $table->decimal('minimum_order', 8, 2)->default(10.00);
            $table->boolean('is_open')->default(true);
            $table->json('opening_hours')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
