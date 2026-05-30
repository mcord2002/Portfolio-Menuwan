import {
  resolveSkillIconSlug,
  SKILL_ICON_COMPONENTS,
} from '@/lib/skill-icons';

type SkillIconProps = {
  icon?: string | null;
  name: string;
  size?: number;
  className?: string;
};

export function SkillIcon({
  icon,
  name,
  size = 18,
  className = '',
}: SkillIconProps) {
  const slug = resolveSkillIconSlug(icon, name);
  const Icon = slug ? SKILL_ICON_COMPONENTS[slug] : null;

  if (!Icon) {
    return (
      <span
        className={`flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-md bg-white/10 text-[10px] font-bold uppercase text-muted ${className}`}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }

  return <Icon size={size} className={className} aria-hidden />;
}
