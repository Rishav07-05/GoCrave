<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * List orders, optionally filtered by user_id or status.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['restaurant', 'orderItems.menuItem']);

        if ($userId = $request->query('user_id')) {
            $query->where('user_id', $userId);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($restaurantId = $request->query('restaurant_id')) {
            $query->where('restaurant_id', $restaurantId);
        }

        $orders = $query->latest()->paginate($request->query('per_page', 20));

        return response()->json($orders);
    }

    /**
     * Create a new order.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'nullable|string',
            'restaurant_id' => 'required|exists:restaurants,id',
            'delivery_address' => 'required|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $restaurant = \App\Models\Restaurant::findOrFail($validated['restaurant_id']);

        // Calculate totals
        $totalAmount = 0;
        $orderItems = [];

        foreach ($validated['items'] as $item) {
            $menuItem = \App\Models\MenuItem::findOrFail($item['menu_item_id']);
            $subtotal = $menuItem->price * $item['quantity'];
            $totalAmount += $subtotal;

            $orderItems[] = [
                'menu_item_id' => $menuItem->id,
                'quantity' => $item['quantity'],
                'unit_price' => $menuItem->price,
                'subtotal' => $subtotal,
            ];
        }

        $order = Order::create([
            'user_id' => $validated['user_id'] ?? null,
            'restaurant_id' => $validated['restaurant_id'],
            'status' => 'pending',
            'total_amount' => $totalAmount,
            'delivery_fee' => $restaurant->delivery_fee,
            'delivery_address' => $validated['delivery_address'],
            'notes' => $validated['notes'] ?? null,
            'estimated_delivery_time' => $restaurant->delivery_time,
        ]);

        foreach ($orderItems as $item) {
            $order->orderItems()->create($item);
        }

        // Create payment record
        $order->payment()->create([
            'amount' => $totalAmount + $restaurant->delivery_fee,
            'method' => 'card',
            'status' => 'completed',
            'transaction_id' => 'TXN_' . strtoupper(uniqid()),
        ]);

        $order->load(['restaurant', 'orderItems.menuItem', 'payment']);

        return response()->json($order, 201);
    }

    /**
     * Show a single order with all details.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load(['restaurant', 'orderItems.menuItem', 'payment']);

        return response()->json($order);
    }

    /**
     * Update order status.
     */
    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,preparing,out_for_delivery,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);
        $order->load(['restaurant', 'orderItems.menuItem']);

        return response()->json($order);
    }
}
