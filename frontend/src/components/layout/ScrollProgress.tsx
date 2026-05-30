'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setVisible(v > 0.01));
  }, [scrollYProgress]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
    />
  );
}
