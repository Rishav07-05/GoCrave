import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Store, Package, DollarSign, Star, TrendingUp, Clock } from 'lucide-react';
import { getDashboardStats } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'Total Revenue', value: `$${stats?.total_revenue?.toFixed(2) || '0'}`, icon: DollarSign, color: 'text-emerald-400', bg: 'from-emerald-500/10' },
    { label: 'Total Orders', value: stats?.total_orders || 0, icon: Package, color: 'text-blue-400', bg: 'from-blue-500/10' },
    { label: 'Restaurants', value: `${stats?.active_restaurants || 0}/${stats?.total_restaurants || 0}`, icon: Store, color: 'text-orange-400', bg: 'from-orange-500/10' },
    { label: 'Avg Rating', value: stats?.average_rating || '0', icon: Star, color: 'text-yellow-400', bg: 'from-yellow-500/10' },
    { label: 'Menu Items', value: stats?.total_menu_items || 0, icon: BarChart3, color: 'text-purple-400', bg: 'from-purple-500/10' },
    { label: 'Reviews', value: stats?.total_reviews || 0, icon: Users, color: 'text-pink-400', bg: 'from-pink-500/10' },
  ];

  const statusColors = {
    pending: 'bg-yellow-500', confirmed: 'bg-blue-500', preparing: 'bg-purple-500',
    out_for_delivery: 'bg-orange-500', delivered: 'bg-emerald-500', cancelled: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-white mb-2">Admin <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Overview</span></h1>
          <p className="text-zinc-400">Platform-wide analytics and management</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {cards.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              className="relative overflow-hidden bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${c.bg} to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50`} />
              <c.icon className={`w-8 h-8 ${c.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{c.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{c.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Orders by Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Orders by Status</h2>
            <div className="space-y-3">
              {Object.entries(stats?.orders_by_status || {}).map(([status, count]) => {
                const total = stats?.total_orders || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400 capitalize">{status.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${statusColors[status] || 'bg-zinc-600'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Restaurants */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Top Restaurants</h2>
            <div className="space-y-3">
              {(stats?.top_restaurants || []).map((r, i) => (
                <div key={r.id} className="flex items-center gap-4 p-3 bg-zinc-800/30 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{r.name}</p>
                    <p className="text-zinc-500 text-xs">{r.cuisine_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">{r.orders_count} orders</p>
                    <div className="flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400" /><span className="text-orange-400 text-xs">{r.rating}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-bold text-white mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-zinc-800">
                <th className="text-left py-3 text-zinc-500 font-medium">ID</th>
                <th className="text-left py-3 text-zinc-500 font-medium">Restaurant</th>
                <th className="text-left py-3 text-zinc-500 font-medium">Status</th>
                <th className="text-right py-3 text-zinc-500 font-medium">Amount</th>
              </tr></thead>
              <tbody>
                {(stats?.recent_orders || []).map(order => (
                  <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                    <td className="py-3 text-white font-medium">#{order.id}</td>
                    <td className="py-3 text-zinc-300">{order.restaurant?.name}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' :
                        order.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                        'bg-orange-500/10 text-orange-400'
                      }`}>{order.status.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="py-3 text-right text-white font-medium">${parseFloat(order.total_amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
