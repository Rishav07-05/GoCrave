import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Package, CheckCircle, MapPin, Clock, DollarSign } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/api';

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDeliver = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'delivered');
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o));
    } catch (err) { console.error(err); }
  };

  const activeDeliveries = orders.filter(o => o.status === 'out_for_delivery');
  const completed = orders.filter(o => o.status === 'delivered');
  const totalEarnings = completed.reduce((sum, o) => sum + parseFloat(o.delivery_fee || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-white mb-2">Delivery <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Dashboard</span></h1>
          <p className="text-zinc-400">Manage your deliveries and track earnings</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { label: 'Active Deliveries', value: activeDeliveries.length, icon: Navigation, color: 'text-orange-400', bg: 'from-orange-500/10' },
            { label: 'Completed', value: completed.length, icon: CheckCircle, color: 'text-emerald-400', bg: 'from-emerald-500/10' },
            { label: 'Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'text-blue-400', bg: 'from-blue-500/10' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="relative overflow-hidden bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.bg} to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50`} />
              <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Active Deliveries</h2>
        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 animate-pulse"><div className="h-5 bg-zinc-800/50 rounded w-48" /></div>
          ))}</div>
        ) : activeDeliveries.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl">
            <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-400">No active deliveries</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeDeliveries.map((order, i) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-orange-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-bold">Order #{order.id}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">In Transit</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-sm"><MapPin className="w-4 h-4" />{order.delivery_address}</div>
                    <p className="text-zinc-500 text-xs mt-1">{order.restaurant?.name} · ${parseFloat(order.delivery_fee || 0).toFixed(2)} fee</p>
                  </div>
                  <button onClick={() => handleDeliver(order.id)}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">
                    Mark Delivered
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Recent Completions</h2>
        <div className="space-y-3">
          {completed.slice(0, 5).map(order => (
            <div key={order.id} className="bg-zinc-900/40 border border-zinc-800/30 rounded-xl p-4 flex items-center gap-4">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-white text-sm font-medium">Order #{order.id}</span>
                <span className="text-zinc-500 text-sm ml-2">· {order.restaurant?.name}</span>
              </div>
              <span className="text-emerald-400 font-semibold text-sm">${parseFloat(order.delivery_fee || 0).toFixed(2)}</span>
            </div>
          ))}
          {completed.length === 0 && <p className="text-zinc-500 text-sm text-center py-4">No completed deliveries yet</p>}
        </div>
      </div>
    </div>
  );
}
