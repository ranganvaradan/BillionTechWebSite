import { useEffect, useMemo, useState, type RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface ParsedStatValue {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  staticOnly: boolean;
}

/** Parse display strings like "₹1,500 Cr+", "100%", "25", "5+", "3,500+". */
export function parseStatValue(raw: string): ParsedStatValue {
  const trimmed = raw.trim();
  if (/\d\s*[–-]\s*\d/.test(trimmed)) {
    return { prefix: '', target: 0, suffix: trimmed, decimals: 0, staticOnly: true };
  }

  const match = trimmed.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, suffix: trimmed, decimals: 0, staticOnly: true };
  }

  const prefix = match[1] ?? '';
  const numRaw = match[2] ?? '0';
  const suffix = match[3] ?? '';
  const decimals = numRaw.includes('.') ? (numRaw.split('.')[1]?.length ?? 0) : 0;
  const target = Number(numRaw.replace(/,/g, ''));
  if (!Number.isFinite(target)) {
    return { prefix: '', target: 0, suffix: trimmed, decimals: 0, staticOnly: true };
  }

  return { prefix, target, suffix, decimals, staticOnly: false };
}

function formatCounted(value: number, parsed: ParsedStatValue): string {
  const fixed = parsed.decimals > 0 ? value.toFixed(parsed.decimals) : Math.round(value).toString();
  const withCommas = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${parsed.prefix}${withCommas}${parsed.suffix}`;
}

/**
 * Count a formatted stat string from 0 → final on first viewport entry.
 * Respects prefers-reduced-motion (renders final value immediately).
 */
export function useCountUp(
  targetRef: RefObject<HTMLElement | null>,
  rawValue: string,
  durationMs = 1200,
  nodeEpoch = 0,
): string {
  const parsed = useMemo(() => parseStatValue(rawValue), [rawValue]);
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() =>
    reduceMotion || parsed.staticOnly ? rawValue : formatCounted(0, parsed),
  );
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion || parsed.staticOnly) {
      setDisplay(rawValue);
      return;
    }

    const node = targetRef.current;
    if (!node || started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, parsed.staticOnly, rawValue, targetRef, nodeEpoch, started]);

  useEffect(() => {
    if (!started || reduceMotion || parsed.staticOnly) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(formatCounted(parsed.target * eased, parsed));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(rawValue);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Intentionally depend on started + rawValue only — not a fresh parsed object each render
  }, [started, reduceMotion, rawValue, durationMs, parsed.staticOnly, parsed.target, parsed.prefix, parsed.suffix, parsed.decimals]);

  return display;
}
