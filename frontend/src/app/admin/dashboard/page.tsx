'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Mail, Wrench, Award } from 'lucide-react';
import { Card } from '@/components/ui';
import { adminApi } from '@/lib/api';
import type { DashboardStats } from '@/lib/types';

const statCards = [
  { key: 'projects' as const, label: 'Projects', icon: FolderKanban, color: 'text-primary' },
  { key: 'messages' as const, label: 'Messages', icon: Mail, color: 'text-accent' },
  { key: 'skills' as const, label: 'Skills', icon: Wrench, color: 'text-green-400' },
  { key: 'certificates' as const, label: 'Certificates', icon: Award, color: 'text-yellow-400' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    adminApi.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 text-muted">Welcome to Menuwan Portfolio CMS</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <Card key={key}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-1 text-3xl font-bold">
                  {stats ? stats[key] : '—'}
                </p>
              </div>
              <Icon className={color} size={32} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
