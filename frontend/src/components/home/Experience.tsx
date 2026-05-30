'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Experience } from '@/lib/types';

export function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section id="experience" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Journey"
        title="Experience Timeline"
        description="My path in software development and technology."
        align="center"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />

        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-12 flex md:mb-16 ${
                isLeft ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              <div
                className={`glass ml-12 w-full rounded-xl p-4 sm:rounded-2xl sm:p-6 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? 'md:mr-8' : 'md:ml-8'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Briefcase size={14} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {new Date(exp.startDate).getFullYear()}
                    {exp.endDate
                      ? ` — ${new Date(exp.endDate).getFullYear()}`
                      : ' — Present'}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {exp.title}
                </h3>
                {exp.company && (
                  <p className="mt-1 text-sm text-muted">{exp.company}</p>
                )}
                {exp.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>
                )}
              </div>

              <div className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <div className="absolute h-6 w-6 animate-ping rounded-full bg-primary/20" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
