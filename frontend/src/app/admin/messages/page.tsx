'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { adminApi } from '@/lib/api';
import type { ContactMessage } from '@/lib/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const load = () => adminApi.getMessages().then(setMessages);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await adminApi.deleteMessage(id);
    load();
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Contact Messages</h1>
      <p className="mb-8 text-muted">View messages from the contact form</p>

      <div className="space-y-4">
        {messages.length === 0 && (
          <Card>
            <p className="text-center text-muted">No messages yet</p>
          </Card>
        )}

        {messages.map((msg) => (
          <Card key={msg.id}>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{msg.subject}</h3>
                <p className="text-sm text-muted">
                  {msg.name} · {msg.email}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(msg.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
            <p className="text-sm leading-relaxed text-muted">{msg.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
