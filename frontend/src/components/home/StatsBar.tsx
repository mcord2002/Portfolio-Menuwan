'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type CounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

function Counter({ value, suffix = '', label }: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(value / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / (value / step));
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="glass rounded-xl px-3 py-4 text-center sm:rounded-2xl sm:px-6 sm:py-5">
      <p className="text-2xl font-bold gradient-text sm:text-3xl md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
    </div>
  );
}

type StatsBarProps = {
  projectCount: number;
  skillCount: number;
  experienceCount: number;
  align?: 'left' | 'center';
};

export function StatsBar({
  projectCount,
  skillCount,
  experienceCount,
  align = 'center',
}: StatsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className={`mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:mt-12 md:gap-4 ${
        align === 'left' ? 'md:max-w-xl' : 'mx-auto max-w-3xl'
      }`}
    >
      <Counter value={projectCount} suffix="+" label="Projects" />
      <Counter value={skillCount} suffix="+" label="Skills" />
      <Counter value={experienceCount} suffix="+" label="Experience" />
    </motion.div>
  );
}
