'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button, Input, Label, Card } from '@/components/ui';
import { adminApi, publicApi } from '@/lib/api';
import type { Certificate } from '@/lib/types';

const emptyForm = { title: '', issuer: '', credentialUrl: '', imageUrl: '', imagePublicId: '' };

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const load = () => publicApi.getCertificates().then(setItems);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let payload = { ...form, credentialUrl: form.credentialUrl || undefined };

    if (imageFile) {
      const uploaded = await adminApi.uploadImage(imageFile);
      payload = { ...payload, imageUrl: uploaded.url, imagePublicId: uploaded.publicId };
    }

    if (editingId) {
      await adminApi.updateCertificate(editingId, payload);
    } else {
      await adminApi.createCertificate(payload);
    }
    resetForm();
    load();
  };

  const startEdit = (item: Certificate) => {
    setForm({
      title: item.title,
      issuer: item.issuer,
      credentialUrl: item.credentialUrl ?? '',
      imageUrl: item.imageUrl ?? '',
      imagePublicId: '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return;
    await adminApi.deleteCertificate(id);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted">Manage certificates and credentials</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> Add Certificate
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label>Issuer / Organization</Label>
              <Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
            </div>
            <div>
              <Label>Credential URL</Label>
              <Input value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />
            </div>
            <div>
              <Label>Certificate Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.issuer}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => startEdit(item)}><Pencil size={14} /></Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
