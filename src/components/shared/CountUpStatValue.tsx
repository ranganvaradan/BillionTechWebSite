import { useCallback, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpStatValueProps {
  value: string;
  color: string;
}

/** Displays a stat value with count-up on first scroll into view. */
export function CountUpStatValue({ value, color }: CountUpStatValueProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [epoch, setEpoch] = useState(0);
  const setRef = useCallback((node: HTMLElement | null) => {
    const prev = ref.current;
    ref.current = node;
    // Only bump when a real node mounts (avoid null↔node thrash loops)
    if (node && node !== prev) setEpoch((e) => e + 1);
  }, []);
  const text = useCountUp(ref, value, 1400, epoch);

  return (
    <Typography
      component="span"
      ref={setRef}
      sx={{
        fontFamily: (t) => t.typography.h1.fontFamily,
        fontWeight: 700,
        fontSize: { xs: '1.5rem', md: '1.85rem' },
        color,
        mb: 0.75,
        display: 'block',
      }}
    >
      {text}
    </Typography>
  );
}
