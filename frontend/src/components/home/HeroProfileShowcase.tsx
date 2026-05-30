'use client';

import { motion } from 'framer-motion';
import { HeroScene3D } from '@/components/3d';
import type { Settings } from '@/lib/types';

const floatingTags = [
  { label: 'Next.js', angle: 25, radius: 38, delay: 0 },
  { label: 'React', angle: 145, radius: 36, delay: 0.3 },
  { label: 'NestJS', angle: 255, radius: 40, delay: 0.6 },
  { label: 'TypeScript', angle: 330, radius: 34, delay: 0.9 },
];

type HeroProfileShowcaseProps = {
  settings: Settings;
};

export function HeroProfileShowcase({ settings }: HeroProfileShowcaseProps) {
  return (
    <div className="relative mx-auto flex h-[360px] w-full max-w-xl items-center justify-center overflow-hidden sm:h-[450px] md:h-[520px] lg:h-[640px] lg:max-w-none">
      {/* 3D background — right column */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <HeroScene3D />
      </div>

      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '120%',
          height: '120%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.06) 50%, transparent 75%)',
        }}
      />

      {/* Ripple waves */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 sm:h-44 sm:w-44 md:h-52 md:w-52"
          animate={{ scale: [1, 3.5], opacity: [0.45, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: i * 0.9,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Orbital rings — hidden on small phones to prevent overflow */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
        {[260, 310, 360, 410].map((size, i) => (
          <motion.div
            key={size}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 16 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute rounded-full border border-dashed"
            style={{
              width: size,
              height: size,
              maxWidth: '92%',
              maxHeight: '92%',
              borderColor:
                i % 2 === 0
                  ? 'rgba(59, 130, 246, 0.25)'
                  : 'rgba(139, 92, 246, 0.18)',
            }}
          />
        ))}

        {[0, 72, 144, 216, 288].map((startDeg, i) => (
          <motion.div
            key={startDeg}
            animate={{ rotate: 360 }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-[min(100%,360px)] w-[min(100%,360px)] md:h-[min(100%,400px)] md:w-[min(100%,400px)]"
            style={{ rotate: `${startDeg}deg` }}
          >
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
          </motion.div>
        ))}
      </div>

      {/* Profile */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-4 rounded-full border-2 border-primary/30 sm:-inset-6 md:-inset-8"
          />
          <motion.div
            animate={{ scale: [1, 1.28, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
            className="absolute -inset-8 rounded-full border border-accent/20 sm:-inset-10 md:-inset-14"
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-[22rem] xl:w-[22rem]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
              />
              <div className="absolute inset-1 overflow-hidden rounded-full bg-background shadow-2xl shadow-primary/30">
                {settings.profile_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={settings.profile_image}
                    alt="Menuwan Kalhara"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-5xl font-bold sm:text-6xl lg:text-7xl">
                    MK
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech tags — hidden on mobile to avoid overflow */}
        {floatingTags.map((tag) => {
          const rad = (tag.angle * Math.PI) / 180;
          return (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.5 + tag.delay },
                scale: { delay: 0.5 + tag.delay, type: 'spring' },
                y: { duration: 3 + tag.delay, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute left-1/2 top-1/2 z-20 hidden whitespace-nowrap rounded-full border border-white/15 bg-background/90 px-3 py-1 text-[10px] font-semibold text-primary shadow-lg backdrop-blur-md sm:inline-flex sm:px-4 sm:py-1.5 sm:text-xs"
                style={{
                  transform: `translate(calc(-50% + ${Math.cos(rad) * tag.radius * 0.5}vmin), calc(-50% + ${Math.sin(rad) * tag.radius * 0.5}vmin))`,
                }}
              >
              {tag.label}
            </motion.span>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 backdrop-blur-sm sm:bottom-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium text-green-400 sm:text-sm">Open to work</span>
        </motion.div>
      </div>
    </div>
  );
}
