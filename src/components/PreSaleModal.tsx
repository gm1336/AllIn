'use client';

import { motion } from 'framer-motion';
import { X, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Raydium Launchpad URL */
  launchUrl?: string;
};

const FALLBACK_URL = process.env.NEXT_PUBLIC_RAYDIUM_URL ?? '';

export default function PreSaleModal({ isOpen, onClose, launchUrl }: Props) {
  if (!isOpen) return null;

  const url = launchUrl || FALLBACK_URL;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        role="dialog"
        aria-modal="true"
        aria-label="ALL-IN Launch"
        className="relative z-10 w-[min(92vw,720px)] rounded-2xl border border-yellow-500/30 bg-[#0b0f15] p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <h2 className="mb-2 text-2xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text">
          ALL-IN Launch
        </h2>
        <p className="mb-4 text-sm text-gray-300">
          We’re launching on <span className="font-semibold">Raydium Launchpad</span>. Bookmark the page and be ready
          when it goes live.
        </p>

        {/* URL box (устойчиво к очень длинной ссылке) */}
        <div className="mb-4 rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="max-h-28 overflow-y-auto break-all text-xs text-gray-200">{url}</div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            >
              <Copy size={16} />
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
              href={url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              <ExternalLink size={16} />
              Join Launch on Raydium
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          No guarantees. Experimental token. Don’t ape more than you can afford to lose. DYOR.
        </p>
      </motion.div>
    </div>
  );
}
