'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroProfileShowcase } from '@/components/home/HeroProfileShowcase';
import { StatsBar } from '@/components/home/StatsBar';
import type { Settings } from '@/lib/types';

type HeroProps = {
  settings: Settings;
  projectCount: number;
  skillCount: number;
  experienceCount: number;
};

export function Hero({
  settings,
  projectCount,
  skillCount,
  experienceCount,
}: HeroProps) {
  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-20 sm:pt-24">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="glow-orb -left-20 top-20 h-[280px] w-[280px] bg-primary/15 sm:-left-40 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />
      <div className="glow-orb -right-20 bottom-0 h-[250px] w-[250px] bg-accent/15 sm:-right-40 sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-10 md:py-12 lg:px-8 lg:gap-12">
        {/* Left — Details */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
          >
            <Sparkles size={14} />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
          >
            {settings.hero_title ?? "Hi, I'm Menuwan Kalhara"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted sm:text-xl"
          >
            {settings.hero_subtitle ?? 'IT Undergraduate @ SLIIT'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-xl font-semibold gradient-text sm:text-2xl md:text-3xl"
          >
            {settings.hero_role ?? 'Full Stack Developer'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base md:mx-0"
          >
            {settings.hero_bio ??
              'Building modern, scalable web applications with cutting-edge technologies.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3 md:justify-start"
          >
            <a href="#projects">
              <Button size="md" className="sm:px-6 sm:py-3 sm:text-base">
                View Projects
              </Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="md" className="sm:px-6 sm:py-3 sm:text-base">
                Contact Me
              </Button>
            </a>
            <a href="#about">
              <Button variant="ghost" size="md" className="sm:px-6 sm:py-3 sm:text-base">
                <Download size={16} /> About Me
              </Button>
            </a>
          </motion.div>

          <StatsBar
            projectCount={projectCount}
            skillCount={skillCount}
            experienceCount={experienceCount}
            align="left"
          />
        </div>

        {/* Right — Profile + animations */}
        <div className="order-1 md:order-2">
          <HeroProfileShowcase settings={settings} />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-muted sm:bottom-8"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
