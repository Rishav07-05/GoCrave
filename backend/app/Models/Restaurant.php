<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'cuisine_type',
        'address',
        'phone',
        'image_url',
        'cover_image_url',
        'rating',
        'delivery_time',
        'delivery_fee',
        'minimum_order',
        'is_open',
        'opening_hours',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'delivery_fee' => 'decimal:2',
        'minimum_order' => 'decimal:2',
        'is_open' => 'boolean',
        'opening_hours' => 'array',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    protected static function booted(): void
    {
        static::creating(function (Restaurant $restaurant) {
            if (empty($restaurant->slug)) {
                $restaurant->slug = Str::slug($restaurant->name);
            }
        });
    }

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
