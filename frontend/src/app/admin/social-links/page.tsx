'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button, Input, Label, Card } from '@/components/ui';
import { adminApi, publicApi } from '@/lib/api';
import type { SocialLink } from '@/lib/types';

const platforms = ['github', 'linkedin', 'tiktok', 'youtube', 'facebook'];

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    publicApi.getSocialLinks().then((data) => {
      const map: Record<string, string> = {};
      platforms.forEach((p) => { map[p] = ''; });
      data.forEach((link: SocialLink) => { map[link.platform] = link.url; });
      setLinks(map);
    });
  }, []);

  const handleSave = async () => {
    const payload = platforms.map((platform) => ({
      platform,
      url: links[platform] || `https://${platform}.com`,
    }));
    await adminApi.updateSocialLinks(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Social Links</h1>
      <p className="mb-8 text-muted">Manage your social media profiles</p>

      <Card className="max-w-xl">
        {saved && (
          <div className="mb-4 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Links saved successfully!
          </div>
        )}

        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform}>
              <Label className="capitalize">{platform}</Label>
              <Input
                value={links[platform] ?? ''}
                onChange={(e) => setLinks({ ...links, [platform]: e.target.value })}
                placeholder={`https://${platform}.com/username`}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleSave} className="mt-6">
          <Save size={16} /> Save Links
        </Button>
      </Card>
    </div>
  );
}
