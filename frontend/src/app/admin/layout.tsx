'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { adminApi } from '@/lib/api';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }

    adminApi
      .me()
      .then(() => setReady(true))
      .catch(() => router.replace('/admin/login'));
  }, [isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
