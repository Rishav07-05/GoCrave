// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrderTracking from './pages/customer/OrderTracking';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/orders/:orderId/track" element={<OrderTracking />} />
          <Route path="/restaurant" element={<RestaurantDashboard />} />
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
