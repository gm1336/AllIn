'use client';

import { motion } from 'framer-motion';
import { X, Copy } from 'lucide-react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** URL Raydium Launchpad. Если не передан — возьмём из переменной окружения. */
  launchUrl?: string;
};

const FALLBACK_URL = process.env.NEXT_PUBLIC_RAYDIUM_URL ?? '';

export default function PreSaleModal({ isOpen, onClose, launchUrl }: Props) {
  if (!isOpen) return null;

  const url = launchUrl || FALLBACK_URL;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label="ALL-IN Launch"
    >
      {/* затемнение фона */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* карточка модалки — ПОЛНОСТЬЮ НЕПРОЗРАЧНАЯ */}
      <motion.div
        className="relative z-[100000] w-[92%] max-w-lg rounded-2xl border border-white/10 bg-[#0B0F19] p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text">
            ALL-IN Launch
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-3 text-sm text-gray-300">
          We’re launching on <span className="font-semibold text-white">Raydium Launchpad</span>.
          Open the page, bookmark it and be ready when it goes live.
        </p>

        <div className="mb-4 flex items-center rounded-xl border border-white/10 bg-[#121826] p-3">
          <input
            readOnly
            value={url}
            className="w-full bg-transparent text-sm text-gray-100 outline-none"
          />
          <button
            onClick={handleCopy}
            className="ml-2 inline-flex items-center gap-1 rounded-md bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
          >
            <Copy size={14} />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500"
        >
          Join Launch on Raydium
        </a>

        <p className="mt-3 text-center text-xs text-gray-400">
          No guarantees. Experimental token. Don’t ape more than you can afford to lose. DYOR.
        </p>
      </motion.div>
    </div>
  );
}
