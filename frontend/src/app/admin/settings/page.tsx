'use client';

import { useEffect, useState } from 'react';
import {
  User,
  Sparkles,
  BookOpen,
  Mail,
  Lock,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Button, Input, Textarea, Label, Card } from '@/components/ui';
import { adminApi } from '@/lib/api';
import type { Settings } from '@/lib/types';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'hero' | 'about' | 'contact' | 'account';

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile Photo', icon: User },
  { id: 'hero', label: 'Hero Section', icon: Sparkles },
  { id: 'about', label: 'About', icon: BookOpen },
  { id: 'contact', label: 'Contact Info', icon: Mail },
  { id: 'account', label: 'Account', icon: Lock },
];

const defaultSiteSettings = {
  hero_title: '',
  hero_subtitle: '',
  hero_role: '',
  hero_bio: '',
  about_bio: '',
  about_education: '',
  about_degree: '',
  about_goals: '',
  profile_image: '',
  contact_email: '',
  contact_location: '',
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [site, setSite] = useState(defaultSiteSettings);
  const [account, setAccount] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([adminApi.getSettings(), adminApi.me()])
      .then(([settings, user]) => {
        setSite({ ...defaultSiteSettings, ...settings });
        setAccount({ name: user.name ?? '', email: user.email });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setError('');
    setTimeout(() => setMessage(''), 4000);
  };

  const saveSiteSettings = async () => {
    setSaving(true);
    setError('');
    try {
      let profileImageUrl = site.profile_image;

      if (profileFile) {
        const uploaded = await adminApi.uploadImage(profileFile);
        profileImageUrl = uploaded.url;
      }

      await adminApi.updateSettings({ ...site, profile_image: profileImageUrl });
      setSite((prev) => ({ ...prev, profile_image: profileImageUrl }));
      setProfileFile(null);
      showSuccess('Site settings saved successfully!');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(typeof msg === 'string' ? msg : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const saveAccount = async () => {
    setSaving(true);
    setError('');
    try {
      const user = await adminApi.updateProfile({
        name: account.name || undefined,
        email: account.email || undefined,
      });
      setAccount({ name: user.name ?? '', email: user.email });
      showSuccess('Account updated successfully!');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(typeof msg === 'string' ? msg : 'Failed to update account');
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await adminApi.changePassword(passwords.current, passwords.new);
      setPasswords({ current: '', new: '', confirm: '' });
      showSuccess('Password changed successfully!');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(typeof msg === 'string' ? msg : 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const previewImage = profileFile
    ? URL.createObjectURL(profileFile)
    : site.profile_image;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted">
          Manage your portfolio profile, site content, and admin account
        </p>
      </div>

      {message && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle size={16} />
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Tabs */}
        <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition',
                activeTab === id
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:bg-white/5 hover:text-foreground',
              )}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="min-w-0">
          {activeTab === 'profile' && (
            <Card>
              <h2 className="mb-6 text-lg font-semibold">Profile Photo</h2>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-primary/30 shadow-lg shadow-primary/10">
                  {previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-3xl font-bold">
                      MK
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Label>Upload new photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
                  />
                  <p className="mt-2 text-xs text-muted">
                    Recommended: square image, at least 400×400px. Max 5MB.
                  </p>
                  {site.profile_image && !profileFile && (
                    <p className="mt-2 truncate text-xs text-muted">
                      Current: {site.profile_image}
                    </p>
                  )}
                </div>
              </div>
              <Button onClick={saveSiteSettings} disabled={saving} className="mt-6">
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Photo'}
              </Button>
            </Card>
          )}

          {activeTab === 'hero' && (
            <Card>
              <h2 className="mb-6 text-lg font-semibold">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={site.hero_title}
                    onChange={(e) => setSite({ ...site, hero_title: e.target.value })}
                    placeholder="Hi, I'm Menuwan Kalhara"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={site.hero_subtitle}
                    onChange={(e) => setSite({ ...site, hero_subtitle: e.target.value })}
                    placeholder="IT Undergraduate @ SLIIT"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={site.hero_role}
                    onChange={(e) => setSite({ ...site, hero_role: e.target.value })}
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div>
                  <Label>Short Bio</Label>
                  <Textarea
                    rows={3}
                    value={site.hero_bio}
                    onChange={(e) => setSite({ ...site, hero_bio: e.target.value })}
                    placeholder="Brief introduction shown in hero..."
                  />
                </div>
              </div>
              <Button onClick={saveSiteSettings} disabled={saving} className="mt-6">
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Hero'}
              </Button>
            </Card>
          )}

          {activeTab === 'about' && (
            <Card>
              <h2 className="mb-6 text-lg font-semibold">About Section</h2>
              <div className="space-y-4">
                <div>
                  <Label>Biography</Label>
                  <Textarea
                    rows={4}
                    value={site.about_bio}
                    onChange={(e) => setSite({ ...site, about_bio: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Education (Institution)</Label>
                  <Input
                    value={site.about_education}
                    onChange={(e) =>
                      setSite({ ...site, about_education: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={site.about_degree}
                    onChange={(e) => setSite({ ...site, about_degree: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Career Goals</Label>
                  <Textarea
                    rows={3}
                    value={site.about_goals}
                    onChange={(e) => setSite({ ...site, about_goals: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={saveSiteSettings} disabled={saving} className="mt-6">
                <Save size={16} />
                {saving ? 'Saving...' : 'Save About'}
              </Button>
            </Card>
          )}

          {activeTab === 'contact' && (
            <Card>
              <h2 className="mb-6 text-lg font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label>Public Email</Label>
                  <Input
                    type="email"
                    value={site.contact_email}
                    onChange={(e) =>
                      setSite({ ...site, contact_email: e.target.value })
                    }
                    placeholder="menuwankalhara@gmail.com"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={site.contact_location}
                    onChange={(e) =>
                      setSite({ ...site, contact_location: e.target.value })
                    }
                    placeholder="Sri Lanka"
                  />
                </div>
              </div>
              <Button onClick={saveSiteSettings} disabled={saving} className="mt-6">
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Contact Info'}
              </Button>
            </Card>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <Card>
                <h2 className="mb-6 text-lg font-semibold">Admin Account</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Display Name</Label>
                    <Input
                      value={account.name}
                      onChange={(e) =>
                        setAccount({ ...account, name: e.target.value })
                      }
                      placeholder="Menuwan Kalhara"
                    />
                  </div>
                  <div>
                    <Label>Login Email</Label>
                    <Input
                      type="email"
                      value={account.email}
                      onChange={(e) =>
                        setAccount({ ...account, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={saveAccount} disabled={saving} className="mt-6">
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Update Account'}
                </Button>
              </Card>

              <Card>
                <h2 className="mb-6 text-lg font-semibold">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={savePassword} disabled={saving} className="mt-6">
                  <Lock size={16} />
                  {saving ? 'Saving...' : 'Change Password'}
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
