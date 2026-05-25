<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = [
            [
                'name' => 'Spice Garden',
                'description' => 'Authentic Indian cuisine with rich flavors and aromatic spices.',
                'cuisine_type' => 'Indian',
                'address' => '42 Curry Lane, Food District',
                'phone' => '+1-555-0101',
                'image_url' => 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                'rating' => 4.7,
                'delivery_time' => '25-35 min',
                'delivery_fee' => 2.99,
                'minimum_order' => 15.00,
                'is_open' => true,
                'latitude' => 40.7128000,
                'longitude' => -74.0060000,
            ],
            [
                'name' => 'Pasta Paradise',
                'description' => 'Handmade pasta and classic Italian dishes made with imported ingredients.',
                'cuisine_type' => 'Italian',
                'address' => '88 Noodle Street, Downtown',
                'phone' => '+1-555-0102',
                'image_url' => 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
                'rating' => 4.5,
                'delivery_time' => '30-40 min',
                'delivery_fee' => 3.49,
                'minimum_order' => 12.00,
                'is_open' => true,
                'latitude' => 40.7580000,
                'longitude' => -73.9855000,
            ],
            [
                'name' => 'Dragon Wok',
                'description' => 'Traditional Chinese stir-fry, dim sum, and noodle bowls.',
                'cuisine_type' => 'Chinese',
                'address' => '16 Dragon Ave, Chinatown',
                'phone' => '+1-555-0103',
                'image_url' => 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
                'rating' => 4.3,
                'delivery_time' => '20-30 min',
                'delivery_fee' => 1.99,
                'minimum_order' => 10.00,
                'is_open' => true,
                'latitude' => 40.7158000,
                'longitude' => -73.9970000,
            ],
            [
                'name' => 'Taco Fiesta',
                'description' => 'Bold Mexican street food — tacos, burritos, and fresh guacamole.',
                'cuisine_type' => 'Mexican',
                'address' => '55 Salsa Blvd, Midtown',
                'phone' => '+1-555-0104',
                'image_url' => 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
                'rating' => 4.6,
                'delivery_time' => '15-25 min',
                'delivery_fee' => 2.49,
                'minimum_order' => 8.00,
                'is_open' => true,
                'latitude' => 40.7484000,
                'longitude' => -73.9857000,
            ],
            [
                'name' => 'Sakura Sushi',
                'description' => 'Fresh sushi, sashimi, and Japanese fusion rolls crafted by master chefs.',
                'cuisine_type' => 'Japanese',
                'address' => '77 Zen Garden Way, Uptown',
                'phone' => '+1-555-0105',
                'image_url' => 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
                'rating' => 4.8,
                'delivery_time' => '30-45 min',
                'delivery_fee' => 3.99,
                'minimum_order' => 20.00,
                'is_open' => true,
                'latitude' => 40.7831000,
                'longitude' => -73.9712000,
            ],
            [
                'name' => 'Burger Republic',
                'description' => 'Gourmet burgers, loaded fries, and craft milkshakes.',
                'cuisine_type' => 'American',
                'address' => '33 Patty Place, West Side',
                'phone' => '+1-555-0106',
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
                'rating' => 4.4,
                'delivery_time' => '20-30 min',
                'delivery_fee' => 2.99,
                'minimum_order' => 10.00,
                'is_open' => true,
                'latitude' => 40.7489000,
                'longitude' => -74.0018000,
            ],
            [
                'name' => 'Mediterranean Breeze',
                'description' => 'Healthy Mediterranean bowls, grilled meats, and fresh salads.',
                'cuisine_type' => 'Mediterranean',
                'address' => '99 Olive Court, East Village',
                'phone' => '+1-555-0107',
                'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                'rating' => 4.5,
                'delivery_time' => '25-35 min',
                'delivery_fee' => 2.49,
                'minimum_order' => 12.00,
                'is_open' => false,
                'latitude' => 40.7265000,
                'longitude' => -73.9815000,
            ],
            [
                'name' => 'Thai Orchid',
                'description' => 'Fragrant Thai curries, pad thai, and tropical desserts.',
                'cuisine_type' => 'Thai',
                'address' => '21 Basil Road, SoHo',
                'phone' => '+1-555-0108',
                'image_url' => 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400',
                'cover_image_url' => 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
                'rating' => 4.6,
                'delivery_time' => '25-40 min',
                'delivery_fee' => 2.99,
                'minimum_order' => 14.00,
                'is_open' => true,
                'latitude' => 40.7233000,
                'longitude' => -74.0030000,
            ],
        ];

        $menuData = [
            'Indian' => [
                'Starters' => [
                    ['name' => 'Samosa (2 pcs)', 'price' => 5.99, 'is_popular' => true],
                    ['name' => 'Paneer Tikka', 'price' => 8.99, 'is_popular' => false],
                    ['name' => 'Onion Bhaji', 'price' => 4.99, 'is_popular' => false],
                ],
                'Mains' => [
                    ['name' => 'Butter Chicken', 'price' => 14.99, 'is_popular' => true],
                    ['name' => 'Lamb Biryani', 'price' => 16.99, 'is_popular' => true],
                    ['name' => 'Palak Paneer', 'price' => 12.99, 'is_popular' => false],
                    ['name' => 'Chicken Tikka Masala', 'price' => 15.49, 'is_popular' => true],
                ],
                'Breads' => [
                    ['name' => 'Garlic Naan', 'price' => 3.49, 'is_popular' => true],
                    ['name' => 'Tandoori Roti', 'price' => 2.49, 'is_popular' => false],
                ],
                'Desserts' => [
                    ['name' => 'Gulab Jamun', 'price' => 5.99, 'is_popular' => true],
                    ['name' => 'Mango Lassi', 'price' => 4.49, 'is_popular' => false],
                ],
            ],
            'Italian' => [
                'Starters' => [
                    ['name' => 'Bruschetta', 'price' => 7.99, 'is_popular' => true],
                    ['name' => 'Caprese Salad', 'price' => 9.49, 'is_popular' => false],
                ],
                'Pasta' => [
                    ['name' => 'Spaghetti Carbonara', 'price' => 13.99, 'is_popular' => true],
                    ['name' => 'Fettuccine Alfredo', 'price' => 12.99, 'is_popular' => true],
                    ['name' => 'Penne Arrabbiata', 'price' => 11.49, 'is_popular' => false],
                ],
                'Pizza' => [
                    ['name' => 'Margherita Pizza', 'price' => 11.99, 'is_popular' => true],
                    ['name' => 'Quattro Formaggi', 'price' => 14.99, 'is_popular' => false],
                ],
                'Desserts' => [
                    ['name' => 'Tiramisu', 'price' => 7.99, 'is_popular' => true],
                    ['name' => 'Panna Cotta', 'price' => 6.99, 'is_popular' => false],
                ],
            ],
            'Chinese' => [
                'Starters' => [
                    ['name' => 'Spring Rolls (4 pcs)', 'price' => 6.49, 'is_popular' => true],
                    ['name' => 'Wonton Soup', 'price' => 5.99, 'is_popular' => false],
                ],
                'Mains' => [
                    ['name' => 'Kung Pao Chicken', 'price' => 12.99, 'is_popular' => true],
                    ['name' => 'Sweet & Sour Pork', 'price' => 13.49, 'is_popular' => true],
                    ['name' => 'Mapo Tofu', 'price' => 10.99, 'is_popular' => false],
                    ['name' => 'Beef Chow Mein', 'price' => 11.99, 'is_popular' => true],
                ],
                'Rice' => [
                    ['name' => 'Egg Fried Rice', 'price' => 7.99, 'is_popular' => true],
                    ['name' => 'Steamed Jasmine Rice', 'price' => 3.49, 'is_popular' => false],
                ],
            ],
            'Mexican' => [
                'Starters' => [
                    ['name' => 'Nachos Supreme', 'price' => 8.99, 'is_popular' => true],
                    ['name' => 'Guacamole & Chips', 'price' => 6.99, 'is_popular' => true],
                ],
                'Tacos' => [
                    ['name' => 'Carnitas Tacos (3)', 'price' => 10.99, 'is_popular' => true],
                    ['name' => 'Fish Tacos (3)', 'price' => 11.99, 'is_popular' => false],
                    ['name' => 'Chicken Tacos (3)', 'price' => 9.99, 'is_popular' => true],
                ],
                'Mains' => [
                    ['name' => 'Beef Burrito', 'price' => 12.49, 'is_popular' => true],
                    ['name' => 'Chicken Quesadilla', 'price' => 10.49, 'is_popular' => false],
                ],
            ],
            'Japanese' => [
                'Sushi' => [
                    ['name' => 'California Roll (8 pcs)', 'price' => 10.99, 'is_popular' => true],
                    ['name' => 'Salmon Nigiri (4 pcs)', 'price' => 12.99, 'is_popular' => true],
                    ['name' => 'Dragon Roll (8 pcs)', 'price' => 14.99, 'is_popular' => true],
                ],
                'Mains' => [
                    ['name' => 'Chicken Teriyaki', 'price' => 13.49, 'is_popular' => true],
                    ['name' => 'Beef Ramen', 'price' => 14.99, 'is_popular' => true],
                    ['name' => 'Tempura Udon', 'price' => 12.49, 'is_popular' => false],
                ],
                'Sides' => [
                    ['name' => 'Edamame', 'price' => 4.99, 'is_popular' => false],
                    ['name' => 'Miso Soup', 'price' => 3.99, 'is_popular' => true],
                ],
            ],
            'American' => [
                'Burgers' => [
                    ['name' => 'Classic Smash Burger', 'price' => 11.99, 'is_popular' => true],
                    ['name' => 'Bacon BBQ Burger', 'price' => 13.99, 'is_popular' => true],
                    ['name' => 'Mushroom Swiss Burger', 'price' => 12.99, 'is_popular' => false],
                ],
                'Sides' => [
                    ['name' => 'Loaded Fries', 'price' => 6.99, 'is_popular' => true],
                    ['name' => 'Onion Rings', 'price' => 5.49, 'is_popular' => false],
                    ['name' => 'Coleslaw', 'price' => 3.99, 'is_popular' => false],
                ],
                'Drinks' => [
                    ['name' => 'Chocolate Milkshake', 'price' => 5.99, 'is_popular' => true],
                    ['name' => 'Strawberry Milkshake', 'price' => 5.99, 'is_popular' => false],
                ],
            ],
            'Mediterranean' => [
                'Starters' => [
                    ['name' => 'Hummus & Pita', 'price' => 6.99, 'is_popular' => true],
                    ['name' => 'Falafel Plate', 'price' => 8.99, 'is_popular' => true],
                ],
                'Bowls' => [
                    ['name' => 'Grilled Chicken Bowl', 'price' => 13.99, 'is_popular' => true],
                    ['name' => 'Lamb Shawarma Bowl', 'price' => 14.99, 'is_popular' => true],
                    ['name' => 'Veggie Mediterranean Bowl', 'price' => 11.99, 'is_popular' => false],
                ],
                'Wraps' => [
                    ['name' => 'Chicken Shawarma Wrap', 'price' => 10.99, 'is_popular' => true],
                    ['name' => 'Falafel Wrap', 'price' => 9.99, 'is_popular' => false],
                ],
            ],
            'Thai' => [
                'Starters' => [
                    ['name' => 'Tom Yum Soup', 'price' => 7.99, 'is_popular' => true],
                    ['name' => 'Chicken Satay (4 pcs)', 'price' => 8.49, 'is_popular' => true],
                ],
                'Mains' => [
                    ['name' => 'Pad Thai', 'price' => 12.99, 'is_popular' => true],
                    ['name' => 'Green Curry', 'price' => 13.49, 'is_popular' => true],
                    ['name' => 'Massaman Curry', 'price' => 14.49, 'is_popular' => false],
                    ['name' => 'Basil Fried Rice', 'price' => 11.49, 'is_popular' => false],
                ],
                'Desserts' => [
                    ['name' => 'Mango Sticky Rice', 'price' => 7.99, 'is_popular' => true],
                ],
            ],
        ];

        foreach ($restaurants as $restaurantData) {
            $restaurant = Restaurant::create($restaurantData);

            $cuisine = $restaurantData['cuisine_type'];
            if (isset($menuData[$cuisine])) {
                foreach ($menuData[$cuisine] as $category => $items) {
                    foreach ($items as $item) {
                        $restaurant->menuItems()->create([
                            'name' => $item['name'],
                            'description' => 'Delicious ' . strtolower($item['name']) . ' prepared fresh daily.',
                            'price' => $item['price'],
                            'category' => $category,
                            'is_popular' => $item['is_popular'],
                            'is_available' => true,
                        ]);
                    }
                }
            }
        }

        // Seed sample orders
        $statuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
        $addresses = [
            '123 Main St, Apt 4B', '456 Oak Ave, Suite 12', '789 Pine Rd',
            '321 Elm Street', '654 Maple Lane, Unit 7', '987 Cedar Blvd',
        ];

        $allRestaurants = Restaurant::with('menuItems')->get();
        foreach ($allRestaurants as $i => $restaurant) {
            $orderCount = rand(2, 4);
            for ($j = 0; $j < $orderCount; $j++) {
                $items = $restaurant->menuItems->random(rand(1, 3));
                $total = 0;
                $orderItemsData = [];
                foreach ($items as $menuItem) {
                    $qty = rand(1, 3);
                    $subtotal = $menuItem->price * $qty;
                    $total += $subtotal;
                    $orderItemsData[] = [
                        'menu_item_id' => $menuItem->id,
                        'quantity' => $qty,
                        'unit_price' => $menuItem->price,
                        'subtotal' => $subtotal,
                    ];
                }

                $order = Order::create([
                    'user_id' => 'user_' . rand(1, 5),
                    'restaurant_id' => $restaurant->id,
                    'status' => $statuses[array_rand($statuses)],
                    'total_amount' => $total,
                    'delivery_fee' => $restaurant->delivery_fee,
                    'delivery_address' => $addresses[array_rand($addresses)],
                    'estimated_delivery_time' => $restaurant->delivery_time,
                ]);

                foreach ($orderItemsData as $itemData) {
                    $order->orderItems()->create($itemData);
                }

                $order->payment()->create([
                    'amount' => $total + $restaurant->delivery_fee,
                    'method' => ['card', 'cash', 'upi'][array_rand(['card', 'cash', 'upi'])],
                    'status' => $order->status === 'cancelled' ? 'failed' : 'completed',
                    'transaction_id' => 'TXN_' . strtoupper(uniqid()),
                ]);
            }
        }

        // Seed reviews
        $comments = [
            'Amazing food, will order again!',
            'Great flavors but delivery was a bit slow.',
            'Best in the city, absolutely loved it!',
            'Good portion sizes, fair prices.',
            'Fresh ingredients, beautifully presented.',
            'Decent food, nothing special.',
            'Exceeded expectations! Highly recommend.',
        ];

        foreach ($allRestaurants as $restaurant) {
            for ($k = 0; $k < rand(3, 6); $k++) {
                Review::create([
                    'user_id' => 'user_' . rand(1, 10),
                    'restaurant_id' => $restaurant->id,
                    'rating' => rand(3, 5),
                    'comment' => $comments[array_rand($comments)],
                ]);
            }
        }
    }
}
