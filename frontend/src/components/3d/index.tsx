'use client';

import dynamic from 'next/dynamic';

export const HeroScene3D = dynamic(
  () => import('./HeroScene3D').then((m) => m.HeroScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-16 w-16 animate-pulse rounded-full bg-primary/20" />
      </div>
    ),
  },
);
