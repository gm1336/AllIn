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
        className="relative z-[210] w-[92%] max-w-md"
        role="dialog"
        aria-modal="true"
        aria-label="You Are Early"
      >
        {/* тонкая светящаяся окантовка как раньше */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-b from-slate-700/70 to-slate-600/60 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {/* ТЁМНАЯ НЕПРОЗРАЧНАЯ КАРТОЧКА */}
          <div className="rounded-2xl bg-[#0B1220] p-6 text-slate-200">
            {/* верхняя панель */}
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-3xl md:text-4xl font-extrabold leading-none tracking-wide">
                <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                  You Are Early
                </span>
              </h3>

              <button
                onClick={onClose}
                className="ml-4 rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 text-sm text-slate-400">
              ALLIN token contract address
            </p>

            {/* поле со ссылкой (тёмное), с квадратной жёлтой кнопкой Copy справа */}
            <div className="mb-4 flex items-center rounded-xl border border-slate-700/60 bg-[#0E1628] px-3 py-3 shadow-inner">
              <input
                readOnly
                value={url}
                className="w-full bg-transparent text-sm text-slate-100 outline-none"
              />
              <button
                onClick={handleCopy}
                className="ml-2 shrink-0 rounded-lg p-2 bg-yellow-400 text-black hover:bg-yellow-300"
                aria-label="Copy"
                title="Copy"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* нижние две кнопки как на 1-м скрине */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-black hover:bg-yellow-300"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>

              <button
                onClick={onClose}
                className="rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            {/* зелёный CTA внизу, на всю ширину */}
            <a
              href={url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-500"
            >
              Join Launch
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
