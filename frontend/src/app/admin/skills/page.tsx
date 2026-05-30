'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
import { Button, Input, Label, Card } from '@/components/ui';
import { SkillIcon } from '@/components/skills/SkillIcon';
import {
  suggestSkillIcon,
  getSkillIconSuggestions,
  SKILL_ICON_COMPONENTS,
} from '@/lib/skill-icons';
import { adminApi, publicApi } from '@/lib/api';
import type { Skill } from '@/lib/types';

const categories = ['Frontend', 'Backend', 'Database', 'Mobile'];

const emptyForm = { name: '', category: 'Frontend', percentage: 80, icon: '' };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [iconManual, setIconManual] = useState(false);
  const lastSuggestedRef = useRef('');

  const suggestions = getSkillIconSuggestions(form.name);
  const suggestedIcon = suggestSkillIcon(form.name);

  const load = () => publicApi.getSkills().then(setSkills);
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setIconManual(false);
    lastSuggestedRef.current = '';
  };

  const handleNameChange = (name: string) => {
    const next = { ...form, name };
    const suggested = suggestSkillIcon(name);

    if (!iconManual && suggested) {
      next.icon = suggested;
      lastSuggestedRef.current = suggested;
    } else if (!iconManual && !suggested) {
      next.icon = '';
      lastSuggestedRef.current = '';
    }

    setForm(next);
  };

  const handleIconChange = (icon: string) => {
    setIconManual(true);
    setForm({ ...form, icon });
  };

  const applySuggestion = (slug: string) => {
    setForm({ ...form, icon: slug });
    setIconManual(false);
    lastSuggestedRef.current = slug;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      icon: form.icon || suggestSkillIcon(form.name) || undefined,
    };

    if (editingId) {
      await adminApi.updateSkill(editingId, payload);
    } else {
      await adminApi.createSkill(payload);
    }
    resetForm();
    load();
  };

  const startEdit = (skill: Skill) => {
    setForm({
      name: skill.name,
      category: skill.category,
      percentage: skill.percentage,
      icon: skill.icon ?? '',
    });
    setIconManual(!!skill.icon);
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await adminApi.deleteSkill(id);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted">
            Type a skill name — the matching tech icon is suggested automatically
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus size={16} /> Add Skill
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Next.js, React, PostgreSQL"
                required
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                className="w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Percentage</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form.percentage}
                onChange={(e) =>
                  setForm({ ...form, percentage: +e.target.value })
                }
              />
            </div>

            {/* Icon field with auto-suggest */}
            <div>
              <Label className="flex items-center gap-2">
                Icon
                {suggestedIcon && !iconManual && (
                  <span className="flex items-center gap-1 text-xs font-normal text-primary">
                    <Sparkles size={12} /> Auto-suggested
                  </span>
                )}
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                  <SkillIcon
                    icon={form.icon}
                    name={form.name}
                    size={22}
                  />
                </div>
                <Input
                  value={form.icon}
                  onChange={(e) => handleIconChange(e.target.value)}
                  placeholder={suggestedIcon ?? 'icon slug e.g. react'}
                  list="skill-icon-list"
                />
              </div>

              {/* Suggestion chips */}
              {(suggestions.length > 0 || suggestedIcon) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {(suggestedIcon
                    ? [suggestedIcon, ...suggestions.filter((s) => s !== suggestedIcon)]
                    : suggestions
                  )
                    .slice(0, 5)
                    .map((slug) => (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => applySuggestion(slug)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition ${
                          form.icon === slug
                            ? 'border-primary/50 bg-primary/15 text-primary'
                            : 'border-white/10 bg-white/5 text-muted hover:border-primary/30 hover:text-foreground'
                        }`}
                      >
                        <SkillIcon icon={slug} name={slug} size={14} />
                        {slug}
                      </button>
                    ))}
                </div>
              )}

              <datalist id="skill-icon-list">
                {Object.keys(SKILL_ICON_COMPONENTS).map((slug) => (
                  <option key={slug} value={slug} />
                ))}
              </datalist>
            </div>

            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                <SkillIcon icon={skill.icon} name={skill.name} size={20} />
              </div>
              <div>
                <span className="font-semibold">{skill.name}</span>
                <span className="ml-3 text-sm text-muted">
                  {skill.category} · {skill.percentage}%
                </span>
                {skill.icon && (
                  <span className="ml-2 text-xs text-muted/60">({skill.icon})</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => startEdit(skill)}>
                <Pencil size={14} />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(skill.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
