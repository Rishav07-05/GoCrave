import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-row-reverse">
      {/* Right side - Illustration/Branding */}
      <div className="hidden lg:flex w-1/2 gradient-bg relative items-center justify-center overflow-hidden border-l border-zinc-800/50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-lg px-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join the Go<span className="text-orange-500">Crave</span> Network
          </motion.h2>
          <motion.p 
            className="text-lg text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Create an account to start ordering your favorite meals or partner with us as a restaurant or delivery agent.
          </motion.p>
        </div>
      </div>

      {/* Left side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-950 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <SignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
            forceRedirectUrl="/customer"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl w-full",
                headerTitle: "text-white font-bold",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white transition-colors",
                socialButtonsBlockButtonText: "text-white font-medium",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-500",
                formFieldLabel: "text-zinc-300",
                formFieldInput: "bg-zinc-950 border-zinc-800 text-white focus:border-orange-500 focus:ring-orange-500/20",
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors",
                footerActionText: "text-zinc-400",
                footerActionLink: "text-orange-500 hover:text-orange-400 font-medium"
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
