import { useState, useCallback, useRef } from 'react';
import { COMBOS } from '@/content/combos';

export interface SlotMachineState {
  isSpinning: boolean;
  reels: [string, string, string];
  spinId: number;
  isJackpot: boolean;
  jackpotUnlocked: boolean;
}

export interface SpinResult {
  reels: [string, string, string];
  spinId: number;
  isJackpot: boolean;
}

export interface SlotMachineOptions {
  seed?: number;
  durationsMs?: [number, number, number];
  gapMs?: number;
  onSpinStart?: () => void;
  onReelStop?: (index: number, word: string) => void;
  onSpinEnd?: (result: SpinResult) => void;
  onJackpot?: () => void;
}

type RNG = () => number;

function makeLCG(seed: number): RNG {
  let s = seed >>> 0;
  return () => ((s = (1664525 * s + 1013904223) >>> 0) / 0xffffffff);
}

function makeCryptoRng(): RNG {
  return () => {
    const x = new Uint32Array(1);
    crypto.getRandomValues(x);
    return x[0] / 0xffffffff;
  };
}

function randInt(rng: RNG, min: number, max: number) {
  // inclusive bounds
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function useSlotMachine(options: SlotMachineOptions) {
  const { seed, durationsMs = [750, 900, 1050], gapMs = 180, onSpinStart, onReelStop, onSpinEnd, onJackpot } = options;

  // RNG setup - persistent across re-renders
  const rngRef = useRef<RNG>(seed != null ? makeLCG(seed) : makeCryptoRng());

  // State
  const [isSpinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<[string, string, string]>(['SPIN', 'TO', 'WIN']);
  const [spinId, setSpinId] = useState(0);
  const [isJackpot, setIsJackpot] = useState(false);
  const [jackpotUnlocked, setJackpotUnlocked] = useState(false);

  // Jackpot cadence refs
  const [sinceJackpot, setSinceJackpot] = useState(0);
  const jackpotTargetRef = useRef(randInt(rngRef.current, 5, 15));

  // Optional UX guard: avoid immediate repeat
  const noImmediateRepeat = false;
  const lastNonJackpotRef = useRef<[string, string, string] | null>(null);

  // Pure random picker (NO sequences)
  const pickRandomCombo = useCallback((forceJackpot = false): [string, string, string] => {
    if (forceJackpot) return ["You", "Are", "Early"];

    let idx = Math.floor(rngRef.current() * COMBOS.length);
    if (noImmediateRepeat && lastNonJackpotRef.current) {
      const safety = 5;
      let tries = 0;
      while (
        tries < safety &&
        COMBOS[idx][0] === lastNonJackpotRef.current[0] &&
        COMBOS[idx][1] === lastNonJackpotRef.current[1] &&
        COMBOS[idx][2] === lastNonJackpotRef.current[2]
      ) {
        idx = Math.floor(rngRef.current() * COMBOS.length);
        tries++;
      }
    }
    const combo = COMBOS[idx];
    lastNonJackpotRef.current = combo;
    return combo;
  }, []);

  const spin = useCallback(async (): Promise<SpinResult> => {
    if (isSpinning) {
      throw new Error('Already spinning');
    }

    setSpinning(true);
    const currentSpinId = spinId + 1;
    setSpinId(currentSpinId);
    onSpinStart?.();

    const mustJackpot = sinceJackpot >= jackpotTargetRef.current;
    const combo = pickRandomCombo(mustJackpot);

    if (mustJackpot) {
      setIsJackpot(true);
      setJackpotUnlocked(true);
      setSinceJackpot(0);
      jackpotTargetRef.current = randInt(rngRef.current, 5, 15);
    } else {
      setIsJackpot(false);
      setSinceJackpot((n) => n + 1);
    }

    // Map combo[0], combo[1], combo[2] to reels with existing durationsMs/gapMs timeline
    return new Promise((resolve) => {
      durationsMs.forEach((dur, i) => {
        const delay = i === 0 ? dur : dur + i * gapMs;
        setTimeout(() => {
          setReels((prev) => {
            const next = [...prev] as [string, string, string];
            next[i] = combo[i];
            return next;
          });
          onReelStop?.(i, combo[i]);
          
          if (i === 2) {
            setTimeout(() => {
              setSpinning(false);
              const result: SpinResult = { 
                reels: combo, 
                spinId: currentSpinId, 
                isJackpot: mustJackpot 
              };
              onSpinEnd?.(result);
              if (mustJackpot) {
                onJackpot?.();
              }
              resolve(result);
            }, 40);
          }
        }, delay);
      });
    });
  }, [isSpinning, spinId, durationsMs, gapMs, sinceJackpot, onSpinStart, onReelStop, onSpinEnd, onJackpot, pickRandomCombo]);

  const canSpin = useCallback(() => !isSpinning, [isSpinning]);

  return {
    state: {
      isSpinning,
      reels,
      spinId,
      isJackpot,
      jackpotUnlocked
    },
    spin,
    canSpin
  };
}