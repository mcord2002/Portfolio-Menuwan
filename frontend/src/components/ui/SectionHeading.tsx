'use client';

import { motion } from 'framer-motion';

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-10 sm:mb-12 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`mt-3 max-w-2xl text-sm text-muted sm:text-base ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className={`mt-6 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-accent ${
          centered ? 'mx-auto origin-center' : ''
        }`}
      />
    </div>
  );
}
