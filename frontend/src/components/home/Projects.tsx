'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Project } from '@/lib/types';

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const display = [...featured, ...others];

  return (
    <section id="projects" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Portfolio"
        title="Featured Projects"
        description="Real-world applications built with modern technologies."
      />

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {display.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{ perspective: 1000 }}
          >
            <TiltCard>
              <article className="glass group overflow-hidden rounded-3xl transition duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-44 overflow-hidden bg-surface sm:h-52">
                  {project.images[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0].url}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 via-surface to-accent/20">
                      <span className="font-[family-name:var(--font-display)] text-6xl font-bold text-white/10">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold shadow-lg">
                      Featured
                    </span>
                  )}
                  <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-primary"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Button variant="secondary" size="sm">
                          <Code2 size={16} /> GitHub
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <Button size="sm">
                          <ExternalLink size={16} /> Live Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
