import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-white/5 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6 sm:text-left">
          <p className="font-[family-name:var(--font-display)] text-base font-bold gradient-text sm:text-lg">
            Menuwan Kalhara
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted sm:text-sm">
            Built with
            <Heart size={14} className="text-red-400" fill="currentColor" />
            using Next.js & NestJS
          </p>
          <p className="text-xs text-muted sm:text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
