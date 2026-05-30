'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Button, Input, Textarea, Label, Card } from '@/components/ui';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { publicApi } from '@/lib/api';
import type { Settings } from '@/lib/types';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

function ContactInfo({ settings }: { settings: Settings }) {
  return (
    <div className="glass rounded-2xl p-5 sm:rounded-3xl sm:p-8">
      <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold sm:mb-6 sm:text-xl">
        Get in Touch
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary sm:h-11 sm:w-11">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted">Email</p>
            <p className="truncate text-sm font-medium">
              {settings.contact_email ?? 'menuwankalhara@gmail.com'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent sm:h-11 sm:w-11">
            <MapPin size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted">Location</p>
            <p className="text-sm font-medium">
              {settings.contact_location ?? 'Sri Lanka'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:mt-8 sm:rounded-2xl sm:p-4">
        <p className="text-xs text-muted sm:text-sm">
          Typically responds within 24 hours. Open to freelance, internships, and collaboration.
        </p>
      </div>
    </div>
  );
}

export function Contact({ settings = {} }: { settings?: Settings }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      await publicApi.sendContact(data);
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-divider" />
      <SectionHeading
        label="Contact"
        title="Let's Work Together"
        description="Have a project in mind? I'd love to hear from you."
        align="center"
      />

      <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <ContactInfo settings={settings} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl sm:rounded-3xl">
          {sent && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-green-400">
              <CheckCircle size={18} />
              Message sent successfully!
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" {...register('name')} />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Subject" {...register('subject')} />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              <Send size={16} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
