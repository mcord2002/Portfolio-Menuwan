import axios from 'axios';
import type {
  Project,
  Skill,
  Experience,
  Certificate,
  SocialLink,
  ContactMessage,
  DashboardStats,
  Settings,
  User,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const publicApi = {
  getSettings: () => api.get<Settings>('/settings').then((r) => r.data),
  getProjects: () => api.get<Project[]>('/projects').then((r) => r.data),
  getSkills: () => api.get<Skill[]>('/skills').then((r) => r.data),
  getExperiences: () => api.get<Experience[]>('/experiences').then((r) => r.data),
  getCertificates: () =>
    api.get<Certificate[]>('/certificates').then((r) => r.data),
  getSocialLinks: () => api.get<SocialLink[]>('/social-links').then((r) => r.data),
  sendContact: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => api.post('/contact', data).then((r) => r.data),
};

export const adminApi = {
  login: (email: string, password: string) =>
    api.post<{ user: User }>('/auth/login', { email, password }).then((r) => r.data),
  logout: () => api.post('/auth/logout').then((r) => r.data),
  me: () => api.get<User>('/auth/me').then((r) => r.data),
  updateProfile: (data: { name?: string; email?: string }) =>
    api.patch<User>('/auth/profile', data).then((r) => r.data),
  changePassword: (currentPassword: string, newPassword: string) =>
    api
      .patch('/auth/password', { currentPassword, newPassword })
      .then((r) => r.data),
  getSettings: () => api.get<Settings>('/settings').then((r) => r.data),
  getStats: () => api.get<DashboardStats>('/dashboard/stats').then((r) => r.data),
  getMessages: () =>
    api.get<ContactMessage[]>('/contact/messages').then((r) => r.data),
  deleteMessage: (id: string) =>
    api.delete(`/contact/messages/${id}`).then((r) => r.data),
  updateSettings: (data: Record<string, string>) =>
    api.put<Settings>('/settings', data).then((r) => r.data),
  createProject: (data: Partial<Project>) =>
    api.post<Project>('/projects', data).then((r) => r.data),
  updateProject: (id: string, data: Partial<Project>) =>
    api.patch<Project>(`/projects/${id}`, data).then((r) => r.data),
  deleteProject: (id: string) =>
    api.delete(`/projects/${id}`).then((r) => r.data),
  addProjectImage: (id: string, url: string, publicId?: string) =>
    api.post(`/projects/${id}/images`, { url, publicId }).then((r) => r.data),
  createSkill: (data: Partial<Skill>) =>
    api.post<Skill>('/skills', data).then((r) => r.data),
  updateSkill: (id: string, data: Partial<Skill>) =>
    api.patch<Skill>(`/skills/${id}`, data).then((r) => r.data),
  deleteSkill: (id: string) => api.delete(`/skills/${id}`).then((r) => r.data),
  createExperience: (data: Partial<Experience>) =>
    api.post<Experience>('/experiences', data).then((r) => r.data),
  updateExperience: (id: string, data: Partial<Experience>) =>
    api.patch<Experience>(`/experiences/${id}`, data).then((r) => r.data),
  deleteExperience: (id: string) =>
    api.delete(`/experiences/${id}`).then((r) => r.data),
  createCertificate: (data: Partial<Certificate>) =>
    api.post<Certificate>('/certificates', data).then((r) => r.data),
  updateCertificate: (id: string, data: Partial<Certificate>) =>
    api.patch<Certificate>(`/certificates/${id}`, data).then((r) => r.data),
  deleteCertificate: (id: string) =>
    api.delete(`/certificates/${id}`).then((r) => r.data),
  updateSocialLinks: (links: { platform: string; url: string }[]) =>
    api.put<SocialLink[]>('/social-links', links).then((r) => r.data),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api
      .post<{ url: string; publicId: string }>('/upload/image', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};
