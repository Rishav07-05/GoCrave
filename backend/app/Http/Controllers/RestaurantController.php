<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    /**
     * List all restaurants with optional search and cuisine filter.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Restaurant::query();

        // Search by name
        if ($search = $request->query('search')) {
            $query->where('name', 'LIKE', "%{$search}%");
        }

        // Filter by cuisine
        if ($cuisine = $request->query('cuisine')) {
            $query->where('cuisine_type', $cuisine);
        }

        // Filter by open status
        if ($request->has('is_open')) {
            $query->where('is_open', $request->boolean('is_open'));
        }

        $restaurants = $query
            ->withCount('reviews')
            ->orderBy('rating', 'desc')
            ->paginate($request->query('per_page', 20));

        return response()->json($restaurants);
    }

    /**
     * Show a single restaurant with its menu items and reviews.
     */
    public function show(Restaurant $restaurant): JsonResponse
    {
        $restaurant->load([
            'menuItems' => fn($q) => $q->where('is_available', true)->orderBy('category'),
            'reviews' => fn($q) => $q->latest()->limit(10),
        ]);
        $restaurant->loadCount('reviews');

        return response()->json($restaurant);
    }
}
