import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Map, Navigation, 
  ShoppingBag, Shield, Clock, Award, Users, 
  Store, ChevronRight, CheckCircle2, Star, Sparkles, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-y-auto selection:bg-orange-500/30">
      
      {/* Background radial glow */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs sm:text-sm mb-6 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
            <Sparkles className="w-3.5 h-3.5" /> Next-Generation Food Delivery Platform
          </span>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-8 text-white">
            Taste Meets <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              Transparency.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience complete control. Watch your favorite local culinary items prepare, package, and travel to your doorstep with our **Live GPS Tracking Map**.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/sign-up" 
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-extrabold text-lg transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 group hover:scale-[1.03]"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto glass hover:bg-zinc-800/80 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 border border-zinc-800"
            >
              <Activity className="w-5 h-5 text-emerald-400" /> Learn More
            </a>
          </div>
        </motion.div>
      </div>

      {/* 2. Visual Platform Features Overview */}
      <div className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative z-10" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Engineered for Perfection</h2>
            <p className="text-zinc-500 mt-4 text-base sm:text-lg">No placeholders. No delays. Just premium culinary transparency at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Map className="w-8 h-8 text-orange-400" />}
              title="GPS Live Route Tracking"
              description="Monitor your courier's real-time coordinate journey from the kitchen to your street door instantly on our custom interactive map."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-emerald-400" />}
              title="Workflow Progression Status"
              description="Get detailed live notifications of order confirmation, active kitchen preparation, and courier transit hand-offs in real-time."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Navigation className="w-8 h-8 text-blue-400" />}
              title="Smart Dispatch Matrix"
              description="Our optimized mapping systems auto-calculate delivery arrival times, minimal routing fees, and swift dispatch queues seamlessly."
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* 3. Interactive "How it Works" Timeline */}
      <div className="py-24 border-t border-zinc-900 bg-zinc-950 relative z-10" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-orange-500 font-extrabold uppercase tracking-widest text-xs">Four Simple Steps</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">The Checkout & GPS Journey</h2>
          </div>

          <div className="relative pl-6 sm:pl-0 sm:grid sm:grid-cols-4 gap-8 space-y-12 sm:space-y-0">
            {/* Step 1 */}
            <TimelineStep 
              num="01"
              title="Browse Catalogs"
              desc="Select your favorite cuisine filter and browse restaurant items."
            />
            {/* Step 2 */}
            <TimelineStep 
              num="02"
              title="Live Checkout"
              desc="Adjust items inside the cart sheet and confirm with our secure billing drawer."
            />
            {/* Step 3 */}
            <TimelineStep 
              num="03"
              title="GPS Dispatch"
              desc="The restaurant starts cooking, and our mapping system locates the nearest courier."
            />
            {/* Step 4 */}
            <TimelineStep 
              num="04"
              title="Track & Enjoy"
              desc="Watch the courier coordinate move live on your screen until the package arrives."
            />
          </div>
        </div>
      </div>

      {/* 4. Three Marketplace Portals */}
      <div className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customers card */}
            <PortalCard 
              type="Customers"
              title="Craving local food?"
              desc="Browse premium menu items, order seamlessly, and enjoy Zomato-style GPS live tracking maps."
              cta="Order Now"
              to="/sign-up"
              color="border-orange-500/20"
              glow="shadow-orange-500/5"
            />
            {/* Restaurant card */}
            <PortalCard 
              type="Restaurants"
              title="Boost your outreach"
              desc="Register catalogs, update menu item availability, manage preparation timelines, and track billing analytics."
              cta="Partner with us"
              to="/sign-up"
              color="border-emerald-500/20"
              glow="shadow-emerald-500/5"
            />
            {/* Courier card */}
            <PortalCard 
              type="Drivers"
              title="Earn on your terms"
              desc="Accept incoming delivery requests, navigate utilizing optimal smart routing matrices, and cash out earnings instantly."
              cta="Drive with us"
              to="/sign-up"
              color="border-blue-500/20"
              glow="shadow-blue-500/5"
            />
          </div>
        </div>
      </div>

      {/* 5. Modern Testimonial Block */}
      <div className="py-24 border-t border-zinc-900 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Approved by Gourmands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border border-zinc-900 flex flex-col justify-between">
              <p className="text-zinc-300 italic text-base sm:text-lg leading-relaxed">
                "GoCrave completely redefined my expectations for food delivery. Being able to watch the courier drive on the Leaflet GPS map is incredibly transparent and reassuring!"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50" className="w-12 h-12 rounded-full object-cover" alt="User avatar" />
                <div>
                  <h4 className="font-bold text-white">Samantha Wright</h4>
                  <div className="flex items-center text-orange-400 gap-0.5 mt-0.5"><Star className="w-3.5 h-3.5 fill-orange-400" /><Star className="w-3.5 h-3.5 fill-orange-400" /><Star className="w-3.5 h-3.5 fill-orange-400" /><Star className="w-3.5 h-3.5 fill-orange-400" /><Star className="w-3.5 h-3.5 fill-orange-400" /></div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 border border-zinc-900 flex flex-col justify-between">
              <p className="text-zinc-300 italic text-base sm:text-lg leading-relaxed">
                "As a restaurant partner, the catalog management tools and instant dispatch integrations make fulfilling dozens of orders daily incredibly straightforward. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50" className="w-12 h-12 rounded-full object-cover" alt="User avatar" />
                <div>
                  <h4 className="font-bold text-white">Marcus Vance</h4>
                  <p className="text-zinc-500 text-xs font-semibold">Owner, Sakura Sushi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. High-Fidelity Premium Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg text-white">Go<span className="text-orange-500">Crave</span></span>
          </div>
          <p className="text-zinc-600 text-xs">&copy; 2026 GoCrave Platform. All rights reserved. Real-Time Tracking Built by Antigravity.</p>
        </div>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 border border-zinc-900 hover:border-zinc-800"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const TimelineStep = ({ num, title, desc }) => (
  <div className="relative">
    <div className="absolute -left-[37px] sm:left-0 sm:-top-[37px] w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.1)]">
      {num}
    </div>
    <h3 className="text-xl font-bold text-white mt-1 sm:mt-0">{title}</h3>
    <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{desc}</p>
  </div>
);

const PortalCard = ({ type, title, desc, cta, to, color, glow }) => (
  <div className={`glass-card p-8 border ${color} shadow-lg ${glow} flex flex-col justify-between h-full`}>
    <div>
      <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 block mb-2">{type}</span>
      <h3 className="text-2xl font-black text-white leading-tight mb-4">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">{desc}</p>
    </div>
    <Link to={to} className="w-full py-3 bg-zinc-900 hover:bg-orange-500 hover:text-white border border-zinc-850 hover:border-orange-500 rounded-xl text-center text-sm font-extrabold transition-all">
      {cta}
    </Link>
  </div>
);

export default Landing;
