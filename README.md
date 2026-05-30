# Menuwan Portfolio CMS

Full-stack portfolio website with admin dashboard for content management.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion |
| Backend | NestJS, TypeScript |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | JWT + HttpOnly Cookies |
| Storage | Cloudinary |
| Deploy | Vercel (frontend) · Railway (backend) |

## Project Structure

```
Portfolio/
├── frontend/     # Next.js public site + admin dashboard
├── backend/      # NestJS REST API
└── README.md
```

## Getting Started

### 1. Supabase Database

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the PostgreSQL connection string from **Settings → Database**

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, Cloudinary keys

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed

npm run start:dev
```

API runs at `http://localhost:4000/api`

**Default admin credentials** (from seed):
- Email: `admin@menuwan.dev`
- Password: `admin123456`

### 3. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local

npm install
npm run dev
```

Site runs at `http://localhost:3000`

Admin dashboard: `http://localhost:3000/admin/login`

## Features

### Public Website
- Hero with animated background
- About, Skills, Projects, Experience timeline
- Certificates, Social links, Contact form

### Admin Dashboard
- JWT login with HttpOnly cookies
- Dashboard stats (projects, messages, skills, certificates)
- CRUD for projects, skills, experience, certificates
- Social links management
- Contact message inbox

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | — | Admin login |
| POST | `/api/auth/logout` | — | Logout |
| GET | `/api/auth/me` | JWT | Current user |
| GET | `/api/projects` | — | List projects |
| POST | `/api/projects` | JWT | Create project |
| GET | `/api/skills` | — | List skills |
| GET | `/api/experiences` | — | List experience |
| GET | `/api/certificates` | — | List certificates |
| GET | `/api/social-links` | — | List social links |
| GET | `/api/settings` | — | Site settings |
| POST | `/api/contact` | — | Submit contact form |
| GET | `/api/dashboard/stats` | JWT | Dashboard counts |
| POST | `/api/upload/image` | JWT | Upload to Cloudinary |

## Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import in Vercel
3. Set `NEXT_PUBLIC_API_URL` to your Railway API URL

### Backend → Railway
1. Push `backend/` to GitHub
2. Create Railway service
3. Add PostgreSQL (or use Supabase `DATABASE_URL`)
4. Set env vars: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, Cloudinary keys
5. Run `npx prisma migrate deploy` on deploy

## Database Tables

- `users` — Admin accounts
- `projects` / `project_images` — Portfolio projects
- `skills` — Skill categories and levels
- `experiences` — Timeline entries
- `certificates` — Certificates
- `social_links` — Social media URLs
- `contact_messages` — Contact form submissions
- `settings` — Site content (hero, about, etc.)

## Theme

Dark premium theme with colors:
- Background: `#0F172A`
- Surface: `#1E293B`
- Primary: `#3B82F6`
- Accent: `#8B5CF6`
