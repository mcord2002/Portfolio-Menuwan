import type { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiSpringboot,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiKotlin,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiDocker,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiGraphql,
  SiRedux,
  SiExpress,
  SiPython,
  SiOpenjdk,
  SiAngular,
  SiVuedotjs,
  SiFlutter,
  SiSwift,
  SiFigma,
  SiFramer,
} from 'react-icons/si';

/** Simple Icons slug → component */
export const SKILL_ICON_COMPONENTS: Record<string, IconType> = {
  nextdotjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  nestjs: SiNestjs,
  springboot: SiSpringboot,
  nodedotjs: SiNodedotjs,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  kotlin: SiKotlin,
  javascript: SiJavascript,
  html5: SiHtml5,
  css: SiCss,
  git: SiGit,
  docker: SiDocker,
  prisma: SiPrisma,
  supabase: SiSupabase,
  firebase: SiFirebase,
  graphql: SiGraphql,
  redux: SiRedux,
  express: SiExpress,
  python: SiPython,
  openjdk: SiOpenjdk,
  angular: SiAngular,
  vuedotjs: SiVuedotjs,
  flutter: SiFlutter,
  swift: SiSwift,
  figma: SiFigma,
  framer: SiFramer,
};

/** Aliases → Simple Icons slug */
const SKILL_ALIASES: Record<string, string> = {
  nextjs: 'nextdotjs',
  next: 'nextdotjs',
  'next.js': 'nextdotjs',
  reactjs: 'react',
  'react.js': 'react',
  ts: 'typescript',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  nest: 'nestjs',
  'nest.js': 'nestjs',
  'spring boot': 'springboot',
  spring: 'springboot',
  node: 'nodedotjs',
  nodejs: 'nodedotjs',
  'node.js': 'nodedotjs',
  postgres: 'postgresql',
  postgresql: 'postgresql',
  mongo: 'mongodb',
  js: 'javascript',
  'java script': 'javascript',
  html: 'html5',
  css3: 'css',
  java: 'openjdk',
  vue: 'vuedotjs',
  vuejs: 'vuedotjs',
  'vue.js': 'vuedotjs',
};

function normalizeSkillName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Suggest icon slug from skill name (exact + partial match).
 */
export function suggestSkillIcon(name: string): string | null {
  if (!name.trim()) return null;

  const normalized = normalizeSkillName(name);
  const compact = normalized.replace(/\s/g, '').replace(/\./g, '');

  if (SKILL_ALIASES[normalized]) return SKILL_ALIASES[normalized];
  if (SKILL_ALIASES[compact]) return SKILL_ALIASES[compact];
  if (SKILL_ICON_COMPONENTS[compact]) return compact;

  for (const [alias, slug] of Object.entries(SKILL_ALIASES)) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return slug;
    }
  }

  for (const slug of Object.keys(SKILL_ICON_COMPONENTS)) {
    if (compact.includes(slug) || slug.includes(compact)) {
      return slug;
    }
  }

  return null;
}

export function getSkillIconSuggestions(name: string, limit = 5): string[] {
  if (!name.trim()) return [];

  const normalized = normalizeSkillName(name);
  const compact = normalized.replace(/\s/g, '').replace(/\./g, '');
  const matches = new Set<string>();

  const primary = suggestSkillIcon(name);
  if (primary) matches.add(primary);

  for (const [alias, slug] of Object.entries(SKILL_ALIASES)) {
    if (alias.startsWith(normalized) || alias.startsWith(compact)) {
      matches.add(slug);
    }
  }

  for (const slug of Object.keys(SKILL_ICON_COMPONENTS)) {
    if (slug.startsWith(compact) || compact.startsWith(slug)) {
      matches.add(slug);
    }
  }

  return Array.from(matches).slice(0, limit);
}

export function resolveSkillIconSlug(
  icon: string | null | undefined,
  skillName: string,
): string | null {
  if (icon && SKILL_ICON_COMPONENTS[icon]) return icon;
  return suggestSkillIcon(skillName);
}
