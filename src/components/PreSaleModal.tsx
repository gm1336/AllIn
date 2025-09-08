'use client';

import { motion } from 'framer-motion';
import { X, Copy as CopyIcon } from 'lucide-react';
import { useState } from 'react';

type PreSaleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  launchUrl?: string; // если не придёт — возьмём из ENV
};

const FALLBACK_URL = process.env.NEXT_PUBLIC_RAYDIUM_URL ?? '';

export default function PreSaleModal({
  isOpen,
  onClose,
  launchUrl,
}: PreSaleModalProps) {
  if (!isOpen) return null;

  const url = (launchUrl || FALLBACK_URL).trim();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-[200]">
      {/* затемнение фона */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="ALL-IN Launch"
      >
        {/* НЕпрозрачная «золотая» карточка */}
        <div className="w-[92%] max-w-xl rounded-2xl shadow-2xl ring-1 ring-amber-400/70 bg-gradient-to-b from-[#F8D74A] via-[#F4C744] to-[#E5A92E] text-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-wide">ALL-IN Launch</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-md hover:bg-black/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mb-3 text-sm">
            We’re launching on <span className="font-semibold">Raydium Launchpad</span>. Open the page, bookmark it and be ready when it goes live.
          </p>

          {/* Поле со ссылкой + копирование */}
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-600/60 bg-white p-3">
            <input
              readOnly
              value={url}
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md bg-amber-600 px-2 py-1 text-xs font-semibold text-black hover:bg-amber-500"
            >
              <CopyIcon className="w-4 h-4 text-black" strokeWidth={2.4} />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
            <a
              href={url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-500"
            >
              Join Launch on Raydium
            </a>
          </div>

          <p className="mt-3 text-center text-xs text-slate-800/80">
            No guarantees. Experimental token. Don’t ape more than you can afford to lose. DYOR.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
