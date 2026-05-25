<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;

class MenuItemController extends Controller
{
    /**
     * List menu items for a specific restaurant, grouped by category.
     */
    public function index(Restaurant $restaurant): JsonResponse
    {
        $menuItems = $restaurant->menuItems()
            ->where('is_available', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get()
            ->groupBy('category');

        return response()->json($menuItems);
    }
}
