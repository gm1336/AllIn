'use client';

import { motion } from 'framer-motion';
import { X, Copy } from 'lucide-react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Raydium Launchpad URL (можно прокинуть пропом или через ENV) */
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
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* затемнение фона */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="relative z-[210] w-[92%] max-w-xl"
        role="dialog"
        aria-modal="true"
        aria-label="ALL-IN Launch"
      >
        {/* тонкая «золотая» окантовка */}
        <div className="rounded-[22px] p-[1px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_26px_rgba(245,158,11,0.35)]">
          {/* ПОЛНОСТЬЮ НЕПРОЗРАЧНЫЙ ЖЁЛТЫЙ ФОН */}
          <div className="rounded-[22px] p-6 bg-gradient-to-b from-[#F8D74A] via-[#F4C744] to-[#E5A92E] text-slate-900">
            {/* заголовок */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-wide">
                <span className="bg-gradient-to-r from-yellow-800 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]">
                  ALL-IN Launch
                </span>
              </h3>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-slate-900/80 hover:bg-black/10 hover:text-slate-900"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 text-sm">
              We’re launching on <span className="font-semibold">Raydium Launchpad</span>. Open the page,
              bookmark it and be ready when it goes live.
            </p>

            {/* поле со ссылкой (непрозрачное) */}
            <div className="mb-4 flex items-center rounded-xl border border-amber-600/50 bg-white p-3 shadow-inner">
              <input
                readOnly
                value={url}
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
              <button
                onClick={handleCopy}
                className="ml-2 inline-flex items-center gap-1 rounded-md bg-amber-600 px-2 py-1 text-xs font-semibold text-black hover:bg-amber-500"
              >
                <Copy size={14} />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* кнопки разных цветов */}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
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
        </div>
      </motion.div>
    </div>
  );
}
