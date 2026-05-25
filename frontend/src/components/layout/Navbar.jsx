import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { MapPin, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-xl tracking-tight text-white">
                Go<span className="text-orange-500">Crave</span>
              </span>
            </Link>
            
          </div>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link to="/sign-in" className="text-zinc-300 hover:text-white transition-colors font-medium">
                Log In
              </Link>
              <Link to="/sign-up" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link 
                to="/customer" 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-zinc-850 transition-all text-sm font-bold shadow-lg shadow-black/40 group hover:scale-[1.02]"
              >
                <LayoutDashboard className="w-4 h-4 text-orange-500 group-hover:rotate-6 transition-transform" />
                <span>Dashboard</span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
