import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, Clock, DollarSign, MapPin, 
  ChevronRight, Utensils, Filter, ShoppingBag, 
  Plus, Minus, X, ArrowLeft, Heart, CheckCircle2,
  Receipt, MessageSquare, Tag, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getRestaurants, getOrders, getRestaurant, createOrder } from '../../services/api';

const cuisineFilters = ['All', 'Favorites', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Japanese', 'American', 'Mediterranean', 'Thai'];

const AVAILABLE_COUPONS = [
  { code: 'CRAVE50', description: '50% off on your meals subtotal', value: 0.5, type: 'percent' },
  { code: 'FREESHIP', description: 'Free delivery fee for your order', value: 0, type: 'free_delivery' },
  { code: 'WELCOME10', description: '$10.00 flat discount on bill', value: 10, type: 'flat' }
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [error, setError] = useState(null);
  
  // Favorited restaurants stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gocrave_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Active deliveries tracking list
  const [activeOrders, setActiveOrders] = useState([]);
  
  // Restaurant Details & Cart states
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('123 Premium Heights, Block 4, Gourmet City');
  const [orderNotes, setOrderNotes] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  // Discount / Coupon Code states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, [search, selectedCuisine, favorites]);

  useEffect(() => {
    fetchActiveOrders();
    // Poll active orders status every 10 seconds for real-time progression tracker in dashboard
    const interval = setInterval(fetchActiveOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (e, restaurantId) => {
    e.stopPropagation(); // Prevent opening restaurant
    setFavorites(prev => {
      const updated = prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId];
      localStorage.setItem('gocrave_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      
      // Handle "Favorites" filter natively
      if (selectedCuisine === 'Favorites') {
        const data = await getRestaurants(params);
        const filtered = (data.data || []).filter(r => favorites.includes(r.id));
        setRestaurants(filtered);
      } else {
        if (selectedCuisine !== 'All') params.cuisine = selectedCuisine;
        const data = await getRestaurants(params);
        setRestaurants(data.data || []);
      }
    } catch (err) {
      setError('Failed to load restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveOrders = async () => {
    try {
      const data = await getOrders();
      const active = (data.data || []).filter(o => o.status !== 'cancelled');
      setActiveOrders(active);
    } catch (err) {
      console.error('Failed to load active orders', err);
    }
  };

  // Fetch full restaurant details with menu
  const handleSelectRestaurant = async (restaurant) => {
    try {
      setSelectedRestaurant(restaurant);
      setLoadingMenu(true);
      setCart([]); // Clear cart when switching restaurants
      setAppliedCoupon(null); // Clear coupons
      setCouponCode('');
      setCouponError('');
      const data = await getRestaurant(restaurant.id);
      setRestaurantDetails(data);
    } catch (err) {
      console.error('Failed to fetch menu details', err);
    } finally {
      setLoadingMenu(false);
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove or decrement item in cart
  const removeFromCart = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  // Apply Coupon Code
  const handleApplyCoupon = (codeToApply) => {
    setCouponError('');
    const matched = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === (codeToApply || couponCode).toUpperCase());
    if (matched) {
      setAppliedCoupon(matched);
      if (!codeToApply) setCouponCode(matched.code);
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or CRAVE50.');
      setAppliedCoupon(null);
    }
  };

  // Remove applied coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Place Checkout Order via API
  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      setPlacingOrder(true);
      
      const payload = {
        restaurant_id: restaurantDetails.id,
        delivery_address: deliveryAddress,
        notes: orderNotes,
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity
        }))
      };

      const newOrder = await createOrder(payload);
      
      // Navigate to live tracking for this new order
      navigate(`/customer/orders/${newOrder.id}/track`);
    } catch (err) {
      console.error('Error placing order', err);
      alert('Could not place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  // Price calculations
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const baseDeliveryFee = restaurantDetails ? parseFloat(restaurantDetails.delivery_fee) : 0;
  
  // Calculate dynamic coupon savings
  let discountAmount = 0;
  let deliveryFee = baseDeliveryFee;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = cartTotal * appliedCoupon.value;
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = Math.min(cartTotal, appliedCoupon.value);
    } else if (appliedCoupon.type === 'free_delivery') {
      deliveryFee = 0;
    }
  }

  const grandTotal = Math.max(0, cartTotal - discountAmount) + deliveryFee;

  // Render static status bar icons inside dynamic list
  const getProgressWidth = (status) => {
    switch (status) {
      case 'pending': return '15%';
      case 'confirmed': return '40%';
      case 'preparing': return '70%';
      case 'out_for_delivery': return '90%';
      case 'delivered': return '100%';
      default: return '10%';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      
      {/* 1. Main Dashboard View */}
      {!selectedRestaurant && (
        <>
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  Discover <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Restaurants</span>
                </h1>
                <p className="text-zinc-400 text-lg">Find your next favorite meal from top-rated restaurants near you</p>
              </motion.div>

              {/* Active Orders Section with Integrated Progression Bars */}
              {activeOrders.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-8 bg-gradient-to-r from-orange-500/10 to-emerald-500/10 border border-orange-500/20 rounded-2xl p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                      <h2 className="text-lg font-bold text-white">Active Deliveries ({activeOrders.length})</h2>
                    </div>
                    <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                      REAL-TIME GPS TRACKING
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeOrders.map(order => {
                      const isDelivered = order.status === 'delivered';
                      return (
                        <div 
                          key={order.id} 
                          className={`bg-zinc-900/60 border rounded-xl p-4 transition-all flex flex-col justify-between ${
                            isDelivered 
                              ? 'border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                              : 'border-zinc-800/80 hover:border-orange-500/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-bold text-white">Order #{order.id}</p>
                              <p className="text-xs text-zinc-400 mt-0.5">{order.restaurant?.name || 'Spice Garden'}</p>
                            </div>
                            <Link
                              to={`/customer/orders/${order.id}/track`}
                              className={`px-3 py-1.5 text-white text-[10px] sm:text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-md hover:scale-[1.02] ${
                                isDelivered 
                                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10' 
                                  : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/10'
                              }`}
                            >
                              {isDelivered ? 'View Details' : 'Track'} <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                          
                          {/* High-Fidelity Progression Step Bar inside list! */}
                          <div className="mt-4">
                            <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-1">
                              <span className={`font-bold capitalize ${isDelivered ? 'text-emerald-400' : 'text-orange-400'}`}>
                                {order.status.replace(/_/g, ' ')}
                              </span>
                              <span>{isDelivered ? 'Arrived & Enjoyed!' : `${order.estimated_delivery_time || '25 min'} left`}</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                  isDelivered 
                                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                                    : 'bg-gradient-to-r from-orange-400 to-orange-500'
                                }`}
                                style={{ width: getProgressWidth(order.status) }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Search Bar */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    id="restaurant-search"
                    type="text"
                    placeholder="Search restaurants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Cuisine Filters (including Favorites) */}
              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {cuisineFilters.map((cuisine) => {
                  const isFav = cuisine === 'Favorites';
                  return (
                    <button
                      key={cuisine}
                      id={`filter-${cuisine.toLowerCase()}`}
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                        selectedCuisine === cuisine
                          ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                          : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                    >
                      {isFav && <Heart className={`w-3.5 h-3.5 ${selectedCuisine === 'Favorites' ? 'fill-white' : 'text-zinc-500'}`} />}
                      {cuisine}
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-zinc-800/50" />
                    <div className="p-6 space-y-3">
                      <div className="h-5 bg-zinc-800/50 rounded w-3/4" />
                      <div className="h-4 bg-zinc-800/50 rounded w-1/2" />
                      <div className="h-4 bg-zinc-800/50 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400 text-lg">{error}</p>
                <button onClick={fetchRestaurants} className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Retry
                </button>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-20">
                <Utensils className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">No restaurants found</p>
                <p className="text-zinc-600 text-sm mt-1">Try favoriting some restaurants or adjusting filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant, index) => (
                  <div 
                    key={restaurant.id} 
                    onClick={() => handleSelectRestaurant(restaurant)}
                    className="cursor-pointer"
                  >
                    <RestaurantCard 
                      restaurant={restaurant} 
                      index={index} 
                      isFavorite={favorites.includes(restaurant.id)}
                      onToggleFavorite={(e) => toggleFavorite(e, restaurant.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* 2. Restaurant Detail & Menu View */}
      {selectedRestaurant && (
        <div className="min-h-screen bg-zinc-950 pb-32">
          {/* Cover Hero Banner */}
          <div className="relative h-80 w-full overflow-hidden">
            <img 
              src={selectedRestaurant.cover_image_url} 
              alt={selectedRestaurant.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            {/* Top Bar inside Banner */}
            <div className="absolute top-6 left-0 right-0 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10">
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => toggleFavorite(e, selectedRestaurant.id)}
                className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(selectedRestaurant.id) ? 'fill-red-500 text-red-500' : 'text-zinc-300'}`} />
              </button>
            </div>

            {/* Restaurant Info Panel Overlay */}
            <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-6 lg:px-8">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-xs font-extrabold tracking-wide uppercase">
                {selectedRestaurant.cuisine_type}
              </span>
              <h1 className="text-4xl font-extrabold text-white mt-3 tracking-tight">{selectedRestaurant.name}</h1>
              <p className="text-zinc-300 mt-2 text-sm max-w-2xl">{selectedRestaurant.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 mt-4 text-xs sm:text-sm font-semibold text-zinc-400">
                <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-lg text-orange-400">
                  <Star className="w-4 h-4 fill-orange-400" />
                  <span>{selectedRestaurant.rating} ({selectedRestaurant.reviews_count || 10}+ reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span>{selectedRestaurant.delivery_time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-zinc-500" />
                  <span>${selectedRestaurant.delivery_fee} Delivery Fee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items Catalog */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-orange-500" /> Catalog & Menu
            </h2>

            {loadingMenu ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-zinc-900/40 h-28 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : restaurantDetails?.menu_items?.length === 0 ? (
              <p className="text-zinc-500">No menu items currently available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurantDetails?.menu_items?.map((item) => {
                  const cartItem = cart.find(i => i.id === item.id);
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-900 hover:border-zinc-800 rounded-2xl p-4 flex gap-4 transition-all group"
                    >
                      {/* Item Image */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden relative bg-zinc-850 flex-shrink-0">
                        <img 
                          src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'; }}
                        />
                      </div>
                      
                      {/* Item Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-orange-400 transition-colors">
                              {item.name}
                            </h3>
                            <span className="font-extrabold text-orange-400 text-sm sm:text-base">
                              ${parseFloat(item.price).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                        </div>

                        {/* Interactive Add Buttons */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-zinc-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850">
                            {item.category}
                          </span>
                          
                          {cartItem ? (
                            <div className="flex items-center bg-orange-500 text-white rounded-lg overflow-hidden h-8 sm:h-9">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="px-3 hover:bg-orange-600 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 font-extrabold text-sm min-w-6 text-center">{cartItem.quantity}</span>
                              <button 
                                onClick={() => addToCart(item)}
                                className="px-3 hover:bg-orange-600 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)}
                              className="px-4 py-1.5 bg-zinc-850 hover:bg-orange-500 text-zinc-300 hover:text-white text-xs sm:text-sm font-bold rounded-lg border border-zinc-800 hover:border-orange-500 transition-all flex items-center gap-1 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Floating Bottom Cart Summary Panel */}
      <AnimatePresence>
        {cart.length > 0 && !showCheckout && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 flex items-center justify-between shadow-[0_10px_30px_rgba(249,115,22,0.4)] z-40 border border-orange-400/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-100 uppercase tracking-wider">{cart.length} Item{cart.length > 1 ? 's' : ''} added</p>
                <p className="text-xl font-extrabold text-white">${cartTotal.toFixed(2)} <span className="text-xs font-medium text-orange-200">+ delivery</span></p>
              </div>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="px-6 py-2.5 bg-white text-orange-600 font-extrabold text-sm rounded-xl hover:bg-zinc-100 transition-all hover:scale-105"
            >
              Checkout Order
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Glassmorphic Zomato-Style Checkout Slide-Over/Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-orange-500" /> Confirm Checkout
                  </h2>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Delivery Address Form */}
                <div className="mt-6">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-orange-500" />
                    <input 
                      type="text" 
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                {/* Order Notes Form */}
                <div className="mt-4">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Order Notes (e.g. Leave at door)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                      placeholder="Add courier instructions"
                    />
                  </div>
                </div>

                {/* 🌟 New Promo Code / Discounts Feature */}
                <div className="mt-6">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Promo Coupons</label>
                  
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-400">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 fill-emerald-400" />
                        <div>
                          <p className="font-extrabold text-xs tracking-wider">{appliedCoupon.code} APPLIED</p>
                          <p className="text-[10px] text-zinc-500">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text" 
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value);
                              setCouponError('');
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                            placeholder="Enter WELCOME10 or CRAVE50"
                          />
                        </div>
                        <button 
                          onClick={() => handleApplyCoupon()}
                          className="px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-xs font-bold rounded-xl text-zinc-300 hover:text-white transition-all uppercase tracking-wider"
                        >
                          Apply
                        </button>
                      </div>
                      
                      {couponError && (
                        <p className="text-[10px] text-red-400 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                        </p>
                      )}

                      {/* Display quick selection coupons */}
                      <div className="flex gap-2 overflow-x-auto pb-1 mt-1">
                        {AVAILABLE_COUPONS.map(c => (
                          <button
                            key={c.code}
                            onClick={() => handleApplyCoupon(c.code)}
                            className="text-[9px] font-black tracking-wider uppercase bg-zinc-900 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-orange-400 hover:border-orange-500/20 transition-all flex-shrink-0"
                          >
                            %{c.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout Items List */}
                <div className="mt-8">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-3">Your Bill Details</label>
                  <div className="space-y-3 bg-zinc-900/40 border border-zinc-900 rounded-xl p-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm text-zinc-300">
                        <span>{item.name} <span className="text-zinc-500 font-bold">x{item.quantity}</span></span>
                        <span className="font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-zinc-900/80 pt-3 flex justify-between text-xs text-zinc-400">
                      <span>Item Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    {/* Dynamic coupon details display */}
                    {appliedCoupon && (
                      <div className="flex justify-between text-xs text-emerald-400 font-semibold animate-pulse">
                        <span>Coupon Savings (%{appliedCoupon.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Delivery Partner Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-zinc-900 pt-3 flex justify-between text-base font-extrabold text-white">
                      <span>Grand Total</span>
                      <span className="text-orange-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Badge */}
                <div className="mt-6 flex gap-3 p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-[10px] text-zinc-500">Zomato-grade safety guidelines followed. Courier undergoes daily wellness checks.</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-zinc-900 pt-4">
                <button 
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  {placingOrder ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Live Order...
                    </>
                  ) : (
                    <>Place Zomato Live Order & Track</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function RestaurantCard({ restaurant, index, isFavorite, onToggleFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all duration-300 cursor-pointer relative"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        {/* Favorite heart icon with dynamic highlight */}
        <button 
          onClick={onToggleFavorite}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-800/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-110 z-10"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-300 hover:text-red-400'}`} />
        </button>

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
          restaurant.is_open
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${restaurant.is_open ? 'bg-emerald-400' : 'bg-red-400'}`} />
          {restaurant.is_open ? 'Open' : 'Closed'}
        </div>

        {/* Cuisine Tag */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-zinc-950/70 backdrop-blur-sm text-xs font-medium text-zinc-300 border border-zinc-700/50">
          {restaurant.cuisine_type}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span className="text-sm font-semibold text-orange-400">{restaurant.rating}</span>
          </div>
        </div>

        <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{restaurant.description}</p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-4 h-4 text-zinc-500" />
            <span>{restaurant.delivery_time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <DollarSign className="w-4 h-4 text-zinc-500" />
            <span>${restaurant.delivery_fee} delivery</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-zinc-500 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{restaurant.address}</span>
        </div>
      </div>
    </motion.div>
  );
}
