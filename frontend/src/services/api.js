import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Restaurants
export const getRestaurants = (params = {}) =>
  api.get('/restaurants', { params }).then(res => res.data);

export const getRestaurant = (id) =>
  api.get(`/restaurants/${id}`).then(res => res.data);

export const getRestaurantMenu = (id) =>
  api.get(`/restaurants/${id}/menu`).then(res => res.data);

// Orders
export const getOrders = (params = {}) =>
  api.get('/orders', { params }).then(res => res.data);

export const createOrder = (data) =>
  api.post('/orders', data).then(res => res.data);

export const getOrder = (id) =>
  api.get(`/orders/${id}`).then(res => res.data);

export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status }).then(res => res.data);

// Dashboard
export const getDashboardStats = () =>
  api.get('/dashboard/stats').then(res => res.data);

export default api;
