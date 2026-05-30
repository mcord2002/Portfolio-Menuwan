'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Target, User, Code2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Settings } from '@/lib/types';

export function About({ settings }: { settings: Settings }) {
  return (
    <section id="about" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="About Me"
        title="Crafting Digital Experiences"
        description="Passionate about building impactful software that solves real-world problems."
      />

      <div className="grid gap-5 md:grid-cols-6 md:grid-rows-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass group md:col-span-4 md:row-span-2 rounded-2xl p-5 transition hover:border-primary/30 sm:rounded-3xl sm:p-8"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary transition group-hover:scale-110">
            <User size={22} />
          </div>
          <h3 className="mb-3 text-xl font-semibold">Biography</h3>
          <p className="leading-relaxed text-muted">
            {settings.about_bio ??
              'Passionate IT undergraduate focused on full-stack development and modern web technologies.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL'].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass group rounded-2xl p-5 md:col-span-2 transition hover:border-primary/30 sm:rounded-3xl sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <GraduationCap size={20} />
          </div>
          <h3 className="mb-2 font-semibold">Education</h3>
          <p className="text-sm font-medium">
            {settings.about_education ??
              'Sri Lanka Institute of Information Technology'}
          </p>
          <p className="mt-1 text-sm text-muted">
            {settings.about_degree ?? 'BSc Information Technology'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass group rounded-2xl p-5 md:col-span-2 transition hover:border-accent/30 sm:rounded-3xl sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Target size={20} />
          </div>
          <h3 className="mb-2 font-semibold">Career Goals</h3>
          <p className="text-sm leading-relaxed text-muted">
            {settings.about_goals ??
              'Become a skilled full-stack developer and contribute to impactful software projects.'}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2 px-2 text-center text-xs text-muted sm:mt-8 sm:gap-3 sm:text-sm"
      >
        <Code2 size={16} className="shrink-0 text-primary" />
        <span>Based in Sri Lanka · Open to remote & freelance work</span>
      </motion.div>
    </section>
  );
}
