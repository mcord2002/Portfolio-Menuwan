'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  Award,
  Share2,
  Mail,
  LogOut,
  Settings,
} from 'lucide-react';
import { adminApi } from '@/lib/api';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/experiences', label: 'Experience', icon: Briefcase },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await adminApi.logout();
    router.push('/admin/login');
  };

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-surface">
      <div className="border-b border-white/10 p-6">
        <Link href="/admin/dashboard" className="text-lg font-bold gradient-text">
          Menuwan CMS
        </Link>
        <p className="mt-1 text-xs text-muted">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition',
              pathname === href
                ? 'bg-primary/20 text-primary'
                : 'text-muted hover:bg-white/5 hover:text-foreground',
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="mb-2 block rounded-xl px-4 py-2 text-sm text-muted hover:bg-white/5"
        >
          View Site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
