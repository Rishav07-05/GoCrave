import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { 
  ArrowLeft, MapPin, Phone, MessageSquare, 
  Clock, Shield, Star, Award, ChevronRight, 
  Check, Play, Pause, RefreshCw 
} from 'lucide-react';
import { getOrder } from '../../services/api';

// Create gorgeous custom SVGs for the Leaflet markers using DivIcon
const createCustomIcon = (color, svgContent) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px ${color}80, inset 0 0 10px rgba(255,255,255,0.3);
      border: 2px solid white;
      transition: all 0.3s ease;
    ">${svgContent}</div>`,
    className: 'custom-leaflet-icon',
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

const restaurantIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
`;

const customerIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`;

const driverIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: white; transform: rotate(-15deg);">
    <path d="M5.5 13H2"/>
    <path d="M17 9H5.5a2.5 2.5 0 0 0 0 5H18"/>
    <circle cx="12" cy="18" r="3"/>
    <circle cx="18" cy="12" r="3"/>
    <path d="M12 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z"/>
  </svg>
`;

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Real-time tracking simulation states
  const [driverPos, setDriverPos] = useState(null);
  const [simStatus, setSimStatus] = useState('preparing'); // preparing, out_for_delivery, arrived, delivered
  const [eta, setEta] = useState(25);
  const [progress, setProgress] = useState(20);
  const [simRunning, setSimRunning] = useState(true);
  
  const simInterval = useRef(null);

  // Restaurant Coordinates (Spice Garden default)
  const [restaurantCoords] = useState([40.7128000, -74.0060000]);
  // Customer Coordinates (A few blocks away)
  const [customerCoords] = useState([40.7220000, -73.9920000]);

  useEffect(() => {
    fetchOrderDetails();
    return () => clearInterval(simInterval.current);
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrder(orderId);
      setOrder(data);
      
      // Initialize driver position at the restaurant
      setDriverPos(restaurantCoords);
      setSimStatus(data.status);
      
      if (data.status === 'out_for_delivery') {
        setProgress(70);
        setEta(8);
      } else if (data.status === 'delivered') {
        setProgress(100);
        setEta(0);
        setDriverPos(customerCoords);
        setSimStatus('delivered');
      } else {
        setProgress(35);
        setEta(18);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Live simulation of driver coordinates moving along the route
  useEffect(() => {
    if (simRunning && simStatus === 'out_for_delivery') {
      let step = 0;
      const totalSteps = 100;
      
      simInterval.current = setInterval(() => {
        step += 1;
        
        // Calculate interpolation between restaurant and customer
        const ratio = step / totalSteps;
        const lat = restaurantCoords[0] + (customerCoords[0] - restaurantCoords[0]) * ratio;
        const lng = restaurantCoords[1] + (customerCoords[1] - restaurantCoords[1]) * ratio;
        
        setDriverPos([lat, lng]);
        
        // Dynamic ETA and Progress updating
        const remainingMinutes = Math.max(1, Math.round(8 * (1 - ratio)));
        setEta(remainingMinutes);
        setProgress(70 + Math.round(25 * ratio));

        if (step >= totalSteps) {
          clearInterval(simInterval.current);
          setSimStatus('delivered');
          setEta(0);
          setProgress(100);
        }
      }, 300); // speed up simulation for high visual feedback
    }

    return () => clearInterval(simInterval.current);
  }, [simRunning, simStatus]);

  const triggerOutForDeliverySim = () => {
    setSimStatus('out_for_delivery');
    setSimRunning(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-orange-500 text-xs font-bold">LIVE</span>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { label: 'Confirmed', desc: 'Order received', done: progress >= 20 },
    { label: 'Preparing', desc: 'Kitchen is cooking', done: progress >= 40 },
    { label: 'On The Way', desc: 'Driver out for delivery', done: progress >= 70 },
    { label: 'Delivered', desc: 'Enjoy your meal!', done: progress >= 100 }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col lg:flex-row">
      
      {/* Left Panel: Real-Time Details & Info */}
      <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-r border-zinc-900/80 bg-zinc-950 relative z-10">
        
        {/* Top Header */}
        <div>
          <Link to="/customer" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 group transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Live Tracking
              </span>
              <h1 className="text-3xl font-extrabold mt-3 tracking-tight">Order #{order?.id}</h1>
              <p className="text-zinc-500 text-sm mt-1">{order?.restaurant?.name || 'Spice Garden'}</p>
            </div>
            
            <div className="text-right">
              <span className="text-zinc-500 text-xs uppercase tracking-wider block">Estimated Arrival</span>
              <span className="text-4xl font-extrabold text-orange-500 tracking-tight">{eta} <span className="text-lg font-medium text-zinc-400">mins</span></span>
            </div>
          </div>

          {/* Quick Simulation Trigger (for presentation/testing demo value) */}
          <div className="mt-4 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-zinc-400">Simulation Control Panel</span>
            </div>
            {simStatus === 'pending' || simStatus === 'preparing' || simStatus === 'confirmed' ? (
              <button 
                onClick={triggerOutForDeliverySim}
                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-lg shadow-orange-500/10"
              >
                <Play className="w-3.5 h-3.5" /> Start Delivery Run
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setSimRunning(!simRunning)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  {simRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />} {simRunning ? 'Pause' : 'Resume'}
                </button>
                <button 
                  onClick={fetchOrderDetails}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            )}
          </div>

          {/* Status Tracker */}
          <div className="mt-8 relative pl-6 border-l border-zinc-800 space-y-8">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-b from-orange-500 to-zinc-800 w-[2px]" style={{ height: `${progress}%` }} />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className={`absolute -left-[31px] top-1.5 w-[12px] h-[12px] rounded-full border-2 transition-all duration-300 ${
                  step.done 
                    ? 'bg-orange-500 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]' 
                    : 'bg-zinc-950 border-zinc-800'
                }`} />
                <div>
                  <h3 className={`text-base font-bold transition-colors ${step.done ? 'text-white' : 'text-zinc-500'}`}>{step.label}</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courier Details */}
        <div className="mt-10 border-t border-zinc-900 pt-6">
          <h2 className="text-zinc-500 text-xs uppercase tracking-wider mb-4">Your Courier</h2>
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-900 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-800 relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" 
                  alt="Courier Photo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-base">Alex Mercer</span>
                  <div className="flex items-center gap-0.5 bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
                    <Star className="w-2.5 h-2.5 fill-orange-400" />
                    <span>4.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-zinc-500 text-xs">Toyota Prius (White)</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-zinc-700/50">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-zinc-700/50">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Safe Delivery Badge */}
        <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
          <Shield className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-xs font-bold text-emerald-400">Contactless Safe Delivery</p>
            <p className="text-zinc-500 text-[10px] mt-0.5">Alex will drop off the food at your doorstep safely.</p>
          </div>
        </div>
      </div>
      
      {/* Right Panel: Interactive High-Fidelity Leaflet Map */}
      <div className="flex-1 min-h-[400px] lg:min-h-screen relative z-0">
        <MapContainer 
          center={restaurantCoords} 
          zoom={14} 
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Restaurant Marker */}
          <Marker position={restaurantCoords} icon={createCustomIcon('#f97316', restaurantIconSvg)}>
            <Popup>
              <div className="text-zinc-950 p-1">
                <p className="font-bold text-sm">Spice Garden</p>
                <p className="text-xs text-zinc-500">Pick-up Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Delivery Location (Customer) Marker */}
          <Marker position={customerCoords} icon={createCustomIcon('#10b981', customerIconSvg)}>
            <Popup>
              <div className="text-zinc-950 p-1">
                <p className="font-bold text-sm">Your Address</p>
                <p className="text-xs text-zinc-500">Delivery Point</p>
              </div>
            </Popup>
          </Marker>

          {/* Real-time moving Driver Marker */}
          {driverPos && (
            <Marker position={driverPos} icon={createCustomIcon('#3b82f6', driverIconSvg)}>
              <Popup>
                <div className="text-zinc-950 p-1">
                  <p className="font-bold text-sm">Alex Mercer</p>
                  <p className="text-xs text-zinc-500">Your Courier is here</p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Draw Polyline path from Restaurant to Customer */}
          <Polyline 
            positions={[restaurantCoords, customerCoords]} 
            color="#f97316" 
            weight={3} 
            dashArray="10, 10" 
            opacity={0.7} 
          />
        </MapContainer>
      </div>
      
    </div>
  );
}
