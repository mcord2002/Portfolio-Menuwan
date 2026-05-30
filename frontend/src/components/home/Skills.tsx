'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillIcon } from '@/components/skills/SkillIcon';
import type { Skill } from '@/lib/types';

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20',
  Backend: 'from-violet-500/20 to-purple-500/20 border-violet-500/20',
  Database: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20',
  Mobile: 'from-orange-500/20 to-amber-500/20 border-orange-500/20',
};

export function Skills({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Expertise"
        title="Skills & Technologies"
        description="A comprehensive toolkit for building modern applications."
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category, ci) => {
          const categorySkills = skills.filter((s) => s.category === category);
          const colorClass =
            categoryColors[category] ??
            'from-primary/20 to-accent/20 border-primary/20';

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08 }}
              className={`glass rounded-2xl border bg-gradient-to-br p-5 sm:rounded-3xl sm:p-7 ${colorClass}`}
            >
              <h3 className="mb-6 font-[family-name:var(--font-display)] text-lg font-semibold">
                {category}
              </h3>
              <div className="space-y-5">
                {categorySkills.map((skill, si) => (
                  <div key={skill.id}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2.5 font-medium">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/25 text-primary">
                          <SkillIcon icon={skill.icon} name={skill.name} size={16} />
                        </span>
                        {skill.name}
                      </span>
                      <span className="text-muted">{skill.percentage}%</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-black/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: si * 0.05 }}
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: si * 0.05 }}
                        className="absolute inset-y-0 left-0 rounded-full bg-white/20 blur-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
