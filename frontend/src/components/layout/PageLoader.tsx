'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative h-20 w-20"
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm font-medium tracking-widest text-muted uppercase"
          >
            Loading Portfolio
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
