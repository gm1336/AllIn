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
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 rounded-xl shadow-2xl border-2 border-yellow-400">
        <div className="absolute inset-2 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 shadow-[inset_0_6px_12px_rgba(0,0,0,0.6)] rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700" />
          <div className="relative h-full flex items-center justify-center z-10">
            <motion.div
              className={cn(
                'text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-300 text-center px-2',
                'drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]',
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
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 via-white/8 to-transparent rounded-t-lg pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 rounded-lg pointer-events-none" />
        </div>
      </div>

      {isCenter && !isSpinning && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rounded-xl pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

const SpinButton = ({
  onSpin,
  isDisabled,
  isSpinning
}: {
  onSpin: () => void;
  isDisabled: boolean;
  isSpinning: boolean;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className={cn(
        'px-8 py-4 bg-gradient-to-b from-[#F5C451] via-[#E3A92C] to-[#D4941A] text-black font-black text-xl rounded-full shadow-xl',
        'border-2 border-yellow-300 relative overflow-hidden',
        'focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900',
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
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-t-full" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent rounded-b-full" />
      <span className="relative z-10 drop-shadow-sm">{isSpinning ? 'Spinning...' : 'SPIN'}</span>
    </motion.button>
  );
};

const PreSaleCTA = ({ onOpenPreSale, jackpotUnlocked }: { onOpenPreSale: () => void; jackpotUnlocked: boolean }) => {
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
        className="px-8 py-4 font-bold text-lg rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/30 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-400 transition-all duration-200"
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
        className="fixed inset-0 bg-yellow-400/20 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <div className="fixed inset-0 pointer-events-none z-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], rotate: [0, 360], y: [0, -100, 100], x: [0, Math.random() * 200 - 100] }}
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
    onJackpot: () => {}
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
        className={cn('w-full max-w-5xl mx-auto', className)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="application"
        aria-label="Slot machine - Press Space or Enter to spin"
      >
        <div className="relative">
          <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-yellow-600/60 relative overflow-hidden">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-xl border-3 border-yellow-300">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
            </div>

            <div className="flex space-x-2 md:space-x-4 mb-8 max-w-2xl mx-auto">
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

            <div className="flex justify-center mb-6">
              <SpinButton onSpin={handleSpin} isDisabled={!canSpin()} isSpinning={state.isSpinning} />
            </div>

            <div className="flex justify-center space-x-6 text-yellow-400">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg border border-yellow-300"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>

            <div className="absolute inset-4 bg-gradient-to-b from-yellow-500/10 via-transparent to-yellow-500/10 rounded-2xl pointer-events-none" />
          </div>

          <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/30 rounded-full blur-xl" />
        </div>
      </div>

      <JackpotEffects isActive={showJackpotEffects} />

      <PreSaleModal
        isOpen={showLaunchModal}
        onClose={() => setShowLaunchModal(false)}
        launchUrl={RAYDIUM_LAUNCH_URL}
      />

      <PreSaleCTA onOpenPreSale={() => setShowLaunchModal(true)} jackpotUnlocked={state.jackpotUnlocked} />
    </>
  );
};
