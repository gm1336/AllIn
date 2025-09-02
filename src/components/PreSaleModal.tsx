import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Полная ссылка на страницу лаунчпада Raydium */
  raydiumUrl: string;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // fallback
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};

export default function PreSaleModal({ isOpen, onClose, raydiumUrl }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0C0F14] p-6 shadow-2xl">
        {/* header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text">
              ALL-IN Launch
            </h2>
            <p className="mt-1 text-sm text-gray-400">We’re launching on Raydium Launchpad.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* URL box */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
            Launchpad URL
          </label>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={raydiumUrl}
              className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm text-gray-200 outline-none"
            />
            <button
              onClick={() => copyToClipboard(raydiumUrl)}
              title="Copy URL"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/20"
            >
              Copy
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          No guarantees. Experimental token. Don’t ape more than you can afford to lose. DYOR.
        </p>

        <a
          href={raydiumUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 block w-full rounded-xl bg-emerald-500 px-4 py-3 text-center text-base font-semibold text-black hover:bg-emerald-400"
        >
          Join Launch on Raydium
        </a>
      </div>
    </div>
  );
}
