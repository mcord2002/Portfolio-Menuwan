'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button, Input, Textarea, Label, Card } from '@/components/ui';
import { adminApi, publicApi } from '@/lib/api';
import type { Project } from '@/lib/types';

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => publicApi.getProjects().then(setProjects);

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
        githubUrl: form.githubUrl || undefined,
        liveUrl: form.liveUrl || undefined,
        featured: form.featured,
      };

      let project: Project;
      if (editingId) {
        project = await adminApi.updateProject(editingId, payload);
      } else {
        project = await adminApi.createProject(payload);
      }

      if (imageFile) {
        const uploaded = await adminApi.uploadImage(imageFile);
        await adminApi.addProjectImage(project.id, uploaded.url, uploaded.publicId);
      }

      resetForm();
      load();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string | string[] } } })?.response
          ?.data?.message;
      setError(
        Array.isArray(msg)
          ? msg.join(', ')
          : typeof msg === 'string'
            ? msg
            : 'Failed to save project. Check image size (max 5MB) and try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl ?? '',
      liveUrl: project.liveUrl ?? '',
      featured: project.featured,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await adminApi.deleteProject(id);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted">Manage portfolio projects</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> Add Project
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">
            {editingId ? 'Edit Project' : 'New Project'}
          </h2>
          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label>Tech Stack (comma separated)</Label>
              <Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </div>
            <div>
              <Label>Project Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
              <p className="mt-1 text-xs text-muted">PNG, JPG, WEBP — max 5MB</p>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <Label htmlFor="featured" className="mb-0">Featured</Label>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-muted line-clamp-1">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => startEdit(project)}>
                <Pencil size={14} />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
