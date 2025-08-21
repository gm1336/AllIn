'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, X } from 'lucide-react';
import { PRESALE_WALLET, PRESALE_MIN_SOL, PRESALE_MAX_SOL, EXPLORER_BASE, PRESALE_PAUSED } from '@/src/constants/presale';
import { shorten, copyToClipboard } from '@/src/lib/ui';

interface PreSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreSaleModal = ({ isOpen, onClose }: PreSaleModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(PRESALE_WALLET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <motion.div
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-yellow-500 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
              Pre-Sale
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              PRESALE_PAUSED 
                ? 'bg-gray-600 text-gray-300' 
                : 'bg-green-600 text-green-100'
            }`}>
              {PRESALE_PAUSED ? 'PAUSED' : 'LIVE'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Instruction */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Send SOL to our funding wallet from your own wallet. Min {PRESALE_MIN_SOL}, max {PRESALE_MAX_SOL} SOL per wallet.
          </p>

          {/* Funding Wallet Card */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Funding Wallet
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-yellow-400 text-sm font-mono bg-gray-800 px-3 py-2 rounded border border-gray-600">
                {shorten(PRESALE_WALLET)}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Copy wallet address"
              >
                <Copy size={16} />
              </button>
              <a
                href={`${EXPLORER_BASE}${PRESALE_WALLET}`}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="View on explorer"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            {copied && (
              <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-gray-500 text-xs leading-relaxed">
            No guarantees. Experimental token. Don't send from CEX. DYOR.
          </p>

          {/* Paused Notice */}
          {PRESALE_PAUSED && (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
              <p className="text-gray-400 text-sm">
                The pre-sale is currently paused. Check back later.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};