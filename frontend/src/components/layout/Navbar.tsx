'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home', num: '01' },
  { href: '#about', label: 'About', num: '02' },
  { href: '#skills', label: 'Skills', num: '03' },
  { href: '#projects', label: 'Projects', num: '04' },
  { href: '#experience', label: 'Experience', num: '05' },
  { href: '#certificates', label: 'Certificates', num: '06' },
  { href: '#contact', label: 'Contact', num: '07' },
];

export function Navbar({ contactEmail }: { contactEmail?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-all duration-500 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3 md:px-6 ${
            scrolled
              ? 'border-white/10 bg-background/80 shadow-2xl shadow-black/40 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 transition group-hover:border-primary/50">
              <span className="font-[family-name:var(--font-display)] text-sm font-bold gradient-text">
                MK
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="hidden sm:block">
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold leading-tight">
                Menuwan Kalhara
              </p>
              <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted">
                <Sparkles size={10} className="text-primary" />
                Full Stack Dev
              </p>
            </div>
          </a>

          {/* Desktop links — pill container */}
          <ul className="hidden items-center gap-0.5 rounded-xl border border-white/5 bg-white/[0.03] p-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative block rounded-lg px-3.5 py-2 text-xs font-medium transition-colors xl:px-4 xl:text-sm ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 ring-1 ring-primary/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#projects"
              className="text-sm text-muted transition hover:text-foreground"
            >
              Work
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition hover:shadow-primary/40 hover:brightness-110"
            >
              Hire Me
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition hover:border-primary/30 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex h-full flex-col px-6 pb-10 pt-28"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Navigation
              </p>

              <ul className="flex flex-col gap-1">
                {links.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition ${
                          isActive
                            ? 'border-primary/30 bg-primary/10'
                            : 'border-transparent hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-xs text-primary/60">
                            {link.num}
                          </span>
                          <span
                            className={`font-[family-name:var(--font-display)] text-lg font-medium ${
                              isActive ? 'gradient-text' : 'text-foreground'
                            }`}
                          >
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          className={`text-muted transition group-hover:text-primary ${
                            isActive ? 'text-primary' : ''
                          }`}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto space-y-4"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent py-4 text-base font-semibold text-white shadow-xl shadow-primary/25"
                >
                  Let&apos;s Work Together
                  <ArrowUpRight size={18} />
                </a>
                <p className="text-center text-xs text-muted">
                  {contactEmail ?? 'menuwankalhara@gmail.com'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
