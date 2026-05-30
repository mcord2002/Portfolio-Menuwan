import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'glass text-foreground hover:bg-white/10 hover:border-primary/30',
  ghost: 'text-muted hover:text-foreground hover:bg-white/5',
  danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('mb-1.5 block text-sm font-medium text-muted', className)}
      {...props}
    />
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('glass rounded-2xl p-6', className)}>{children}</div>
  );
}
