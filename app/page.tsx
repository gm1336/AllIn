'use client';

import { motion } from 'framer-motion';
import { SlotMachine } from '@/components/slot-machine';
import { CasinoBackground } from '@/components/background';
import { Header } from '@/components/header';
import { copy } from '@/content/copy';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CasinoBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 py-12 lg:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {copy.hero.headline}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {copy.hero.subheadline}
            </motion.p>
          </div>

          {/* Slot Machine */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SlotMachine 
              seed={process.env.NODE_ENV === 'development' ? 42 : undefined}
            />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <motion.p
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {copy.footer.legal}
            </motion.p>
          </div>
        </footer>
      </div>
    </div>
  );
}