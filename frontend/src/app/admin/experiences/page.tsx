'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button, Input, Textarea, Label, Card } from '@/components/ui';
import { adminApi, publicApi } from '@/lib/api';
import type { Experience } from '@/lib/types';

const emptyForm = {
  title: '',
  company: '',
  description: '',
  startDate: '',
  endDate: '',
};

export default function AdminExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => publicApi.getExperiences().then(setItems);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      endDate: form.endDate || undefined,
    };
    if (editingId) {
      await adminApi.updateExperience(editingId, payload);
    } else {
      await adminApi.createExperience(payload);
    }
    resetForm();
    load();
  };

  const startEdit = (item: Experience) => {
    setForm({
      title: item.title,
      company: item.company ?? '',
      description: item.description ?? '',
      startDate: item.startDate.slice(0, 10),
      endDate: item.endDate?.slice(0, 10) ?? '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    await adminApi.deleteExperience(id);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted">Manage timeline entries</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> Add Experience
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
              <Label>Company (optional)</Label>
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div>
              <Label>End Date (optional)</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
              <p className="text-sm text-muted">
                {new Date(item.startDate).getFullYear()}
                {item.endDate ? ` - ${new Date(item.endDate).getFullYear()}` : ' - Present'}
              </p>
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
