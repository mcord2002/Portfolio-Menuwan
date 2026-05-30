'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SocialLink } from '@/lib/types';

const platformLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};

const platformEmoji: Record<string, string> = {
  github: '⌨️',
  linkedin: '💼',
  youtube: '▶️',
  facebook: '👥',
  tiktok: '🎵',
};

export function ContentCreator({ links }: { links: SocialLink[] }) {
  return (
    <section id="creator" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Social"
        title="Content Creator"
        description="Follow my journey across social platforms."
        align="center"
      />

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {links.map((link, i) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.06, y: -6 }}
            className="glass group flex min-w-[calc(50%-0.375rem)] flex-col items-center gap-2 rounded-xl px-5 py-5 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:min-w-[140px] sm:gap-3 sm:rounded-2xl sm:px-8 sm:py-7"
          >
            <span className="text-3xl transition group-hover:scale-110">
              {platformEmoji[link.platform] ?? '🔗'}
            </span>
            <span className="text-sm font-medium">
              {platformLabels[link.platform] ?? link.platform}
            </span>
            <ExternalLink
              size={14}
              className="text-muted opacity-0 transition group-hover:opacity-100"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
