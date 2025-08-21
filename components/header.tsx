'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Twitter } from 'lucide-react';
import { copy } from '@/content/copy';

export const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative z-10 flex items-center justify-between p-6 lg:p-8">
      {/* Brand */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text">
          {copy.header.brand}
        </h1>
      </motion.div>

      {/* Twitter Icon Button */}
      <motion.a
        href={copy.header.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full shadow-lg border border-gray-600 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
        whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
        whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        aria-label="Follow on X (Twitter)"
      >
        <Twitter size={18} />
        <span className="sr-only">Follow on X (Twitter)</span>
      </motion.a>
    </header>
  );
};