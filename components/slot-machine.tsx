'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useSlotMachine } from '@/lib/slot';
import { cn } from '@/lib/utils';
import PreSaleModal from '@/src/components/PreSaleModal';

interface SlotMachineProps {
  seed?: number;
  durationsMs?: [number, number, number];
  gapMs?: number;
  className?: string;
}

interface ReelProps {
  word: string;
  isSpinning: boolean;
  delay: number;
  isCenter?: boolean;
}

// Актуальная ссылка на Raydium Launchpad
const RAYDIUM_LAUNCH_URL =
  'https://raydium.io/launchpad/token/?mint=2BYVnsTENrMw2iYRyXF9Nczme7PzbjdbSbqa1YSDFray&fromCreate=true';

const Reel = ({ word, isSpinning, delay, isCenter }: ReelProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayWord, setDisplayWord] = useState(word);

  useEffect(() => {
    if (!isSpinning) {
      const timer = setTimeout(() => setDisplayWord(word), delay);
      return () => clearTimeout(timer);
    }
  }, [word, isSpinning, delay]);

  return (
    <div className="relative flex-1 h-16 sm:h-20 md:h-24 overflow-hidden">
      {/* Outer Bezel */}
      <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 shadow-2xl">
        {/* Inner Window */}
        <div className="absolute inset-2 rounded-lg overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 rounded-lg shadow-[inset_0_6px_12px_rgba(0,0,0,0.6)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.div
              className={cn(
                'px-2 text-center font-bold text-yellow-300',
                'text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]',
                isCenter && !shouldReduceMotion && 'filter drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]'
              )}
              style={{ willChange: 'transform' }}
              animate={
                isSpinning && !shouldReduceMotion
                  ? { y: [-30, 0, -30], opacity: [0.4, 1, 0.4], transition: { duration: 0.15, repeat: Infinity, ease: 'easeInOut' } }
                  : { y: 0, opacity: 1, scale: isCenter && !isSpinning ? 1.05 : 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
              }
            >
              {isSpinning ? '???' : displayWord}
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-gradient-to-b from-white/15 via-white/8 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      </div>

      {/* Center Row Glow */}
      {isCenter && !isSpinning && (
        <div className="pointer-events-none absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      )}
    </div>
  );
};

const SpinButton = ({
  onSpin,
  isDisabled,
  isSpinning,
}: {
  onSpin: () => void;
  isDisabled: boolean;
  isSpinning: boolean;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className={cn(
        'rounded-full border-2 border-yellow-300 bg-gradient-to-b from-[#F5C451] via-[#E3A92C] to-[#D4941A] px-8 py-4 text-xl font-black text-black shadow-xl',
        'relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900',
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-2xl hover:shadow-yellow-500/30'
      )}
      onClick={onSpin}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSpin();
        }
      }}
      disabled={isDisabled}
      whileHover={!isDisabled && !shouldReduceMotion ? { scale: 1.05 } : {}}
      whileTap={!isDisabled && !shouldReduceMotion ? { scale: 0.95 } : {}}
      role="button"
      aria-label="Spin"
      tabIndex={0}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full bg-gradient-to-t from-black/30 to-transparent" />
      <span className="relative z-10 drop-shadow-sm">{isSpinning ? 'Spinning...' : 'SPIN'}</span>
    </motion.button>
  );
};

const PreSaleCTA = ({
  onOpenPreSale,
  jackpotUnlocked,
}: {
  onOpenPreSale: () => void;
  jackpotUnlocked: boolean;
}) => {
  // Показываем CTA только после «джекпота»
  if (!jackpotUnlocked) return null;

  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onOpenPreSale}
        className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-green-500 hover:to-green-600 hover:shadow-xl hover:shadow-green-500/30 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Join Launch
      </button>
    </motion.div>
  );
};

const JackpotEffects = ({ isActive }: { isActive: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  if (!isActive || shouldReduceMotion) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none bg-yellow-400/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <div className="fixed inset-0 z-40 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-yellow-400"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              y: [0, -100, 100],
              x: [0, Math.random() * 200 - 100],
            }}
            transition={{ duration: 2, delay: Math.random() * 0.5, ease: 'easeOut' }}
          />
        ))}
      </div>
    </>
  );
};

export const SlotMachine = ({ seed, durationsMs, gapMs, className }: SlotMachineProps) => {
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [showJackpotEffects, setShowJackpotEffects] = useState(false);

  const { state, spin, canSpin } = useSlotMachine({
    seed,
    durationsMs: durationsMs || [750, 900, 1050],
    gapMs: gapMs || 180,
    onSpinStart: () => {},
    onReelStop: () => {},
    onSpinEnd: (result) => {
      if (result.isJackpot) {
        setShowJackpotEffects(true);
        setTimeout(() => {
          setShowJackpotEffects(false);
          setShowLaunchModal(true);
        }, 1500);
      }
    },
    onJackpot: () => {},
  });

  const handleSpin = () => {
    if (canSpin()) spin();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && canSpin()) {
      e.preventDefault();
      handleSpin();
    }
  };

  return (
    <>
      <div
        className={cn('mx-auto w-full max-w-5xl', className)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="application"
        aria-label="Slot machine - Press Space or Enter to spin"
      >
        <div className="relative">
          <div className="relative rounded-3xl border-4 border-yellow-600/60 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-6 shadow-2xl md:p-10">
            <div className="absolute -top-6 left-1/2 h-12 w-40 -translate-x-1/2 transform rounded-full border-4 border-yellow-300 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl">
              <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent" />
            </div>

            {/* Reels */}
            <div className="mx-auto mb-8 flex max-w-2xl space-x-2 md:space-x-4">
              {state.reels.map((word, index) => (
                <Reel
                  key={index}
                  word={word}
                  isSpinning={state.isSpinning}
                  delay={index * (gapMs || 180)}
                  isCenter={index === 1}
                />
              ))}
            </div>

            {/* Spin Button */}
            <div className="mb-6 flex justify-center">
              <SpinButton onSpin={handleSpin} isDisabled={!canSpin()} isSpinning={state.isSpinning} />
            </div>

            {/* Decorative lights */}
            <div className="flex justify-center space-x-6 text-yellow-400">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-4 w-4 rounded-full border border-yellow-300 bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-4 rounded-2xl bg-gradient-to-b from-yellow-500/10 via-transparent to-yellow-500/10" />
          </div>

          <div className="absolute -bottom-6 left-6 right-6 h-12 rounded-full bg-black/30 blur-xl" />
        </div>
      </div>

      <JackpotEffects isActive={showJackpotEffects} />

      {/* Единственная модалка — Launch (Raydium) */}
      <PreSaleModal
        isOpen={showLaunchModal}
        onClose={() => setShowLaunchModal(false)}
        launchUrl={RAYDIUM_LAUNCH_URL}
      />

      {/* CTA (показывается после «джекпота») */}
      <PreSaleCTA onOpenPreSale={() => setShowLaunchModal(true)} jackpotUnlocked={state.jackpotUnlocked} />
    </>
  );
};
