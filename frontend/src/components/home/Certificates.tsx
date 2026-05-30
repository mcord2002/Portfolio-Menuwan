'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { Button } from '@/components/ui';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Certificate } from '@/lib/types';

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Achievements"
        title="Certificates & Credentials"
        description="Professional certifications and learning milestones."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{ perspective: 800 }}
          >
            <TiltCard>
              <div className="glass group overflow-hidden rounded-3xl transition hover:shadow-xl hover:shadow-accent/10">
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-accent/10">
                  {cert.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Award size={48} className="text-white/10" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-1 font-semibold">{cert.title}</h3>
                  <p className="mb-4 text-sm text-muted">{cert.issuer}</p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm">
                        <ExternalLink size={14} /> View Credential
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
