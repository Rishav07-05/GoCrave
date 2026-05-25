import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, ChefHat, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/api';

const statusConfig = {
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: Clock, label: 'Pending' },
  confirmed: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: CheckCircle, label: 'Confirmed' },
  preparing: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: ChefHat, label: 'Preparing' },
  out_for_delivery: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: Package, label: 'Out for Delivery' },
  delivered: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle, label: 'Cancelled' },
};

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) { console.error(err); }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const todayRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-400', bg: 'from-blue-500/10' },
    { label: 'Active Orders', value: activeOrders.length, icon: Clock, color: 'text-orange-400', bg: 'from-orange-500/10' },
    { label: 'Revenue', value: `$${todayRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-400', bg: 'from-emerald-500/10' },
    { label: 'Completion', value: `${orders.length ? Math.round((orders.filter(o => o.status === 'delivered').length / orders.length) * 100) : 0}%`, icon: TrendingUp, color: 'text-purple-400', bg: 'from-purple-500/10' },
  ];

  const nextStatus = { pending: 'confirmed', confirmed: 'preparing', preparing: 'out_for_delivery', out_for_delivery: 'delivered' };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-white mb-2">Restaurant <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Dashboard</span></h1>
          <p className="text-zinc-400">Manage incoming orders and track performance</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="relative overflow-hidden bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.bg} to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50`} />
              <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === s ? 'bg-orange-500 text-white' : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700'}`}>
              {s === 'all' ? 'All' : statusConfig[s]?.label}{s !== 'all' ? ` (${orders.filter(o => o.status === s).length})` : ''}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {loading ? [...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6 animate-pulse"><div className="h-5 bg-zinc-800/50 rounded w-48" /></div>
          )) : filteredOrders.length === 0 ? (
            <div className="text-center py-16"><AlertCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" /><p className="text-zinc-400">No orders found</p></div>
          ) : filteredOrders.map((order, i) => {
            const cfg = statusConfig[order.status] || statusConfig.pending;
            const Icon = cfg.icon;
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-bold">Order #{order.id}</span>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                        <Icon className="w-3.5 h-3.5" />{cfg.label}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm">{order.restaurant?.name} · <span className="text-white font-semibold">${parseFloat(order.total_amount).toFixed(2)}</span></p>
                    <p className="text-zinc-600 text-xs mt-1">{order.delivery_address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {nextStatus[order.status] && (
                      <button onClick={() => handleStatusUpdate(order.id, nextStatus[order.status])}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
                        → {statusConfig[nextStatus[order.status]]?.label}
                      </button>
                    )}
                    {!['delivered', 'cancelled'].includes(order.status) && (
                      <button onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        className="px-4 py-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 text-sm rounded-xl transition-colors border border-zinc-700">Cancel</button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
