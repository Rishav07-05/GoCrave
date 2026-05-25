<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\Review;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Return aggregate stats for the admin dashboard.
     */
    public function stats(): JsonResponse
    {
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $activeRestaurants = Restaurant::where('is_open', true)->count();
        $totalRestaurants = Restaurant::count();
        $totalMenuItems = MenuItem::count();
        $totalReviews = Review::count();
        $averageRating = Restaurant::avg('rating');

        $ordersByStatus = Order::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $recentOrders = Order::with(['restaurant'])
            ->latest()
            ->limit(10)
            ->get();

        $topRestaurants = Restaurant::withCount('orders')
            ->orderByDesc('orders_count')
            ->limit(5)
            ->get();

        return response()->json([
            'total_orders' => $totalOrders,
            'total_revenue' => round($totalRevenue, 2),
            'active_restaurants' => $activeRestaurants,
            'total_restaurants' => $totalRestaurants,
            'total_menu_items' => $totalMenuItems,
            'total_reviews' => $totalReviews,
            'average_rating' => round($averageRating, 1),
            'orders_by_status' => $ordersByStatus,
            'recent_orders' => $recentOrders,
            'top_restaurants' => $topRestaurants,
        ]);
    }
}
