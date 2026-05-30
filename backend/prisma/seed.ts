import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@menuwan.dev';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123456';

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed, name: 'Menuwan Kalhara' },
  });

  const defaultSettings = {
    hero_title: "Hi, I'm Menuwan Kalhara",
    hero_subtitle: 'IT Undergraduate @ SLIIT',
    hero_role: 'Full Stack Developer',
    hero_bio:
      'Passionate developer building modern web and mobile applications.',
    about_bio:
      'I am an IT undergraduate at Sri Lanka Institute of Information Technology (SLIIT), pursuing BSc in Information Technology. I love building full-stack applications and exploring new technologies.',
    about_education: 'Sri Lanka Institute of Information Technology',
    about_degree: 'BSc Information Technology',
    about_goals:
      'Become a skilled full-stack developer and contribute to impactful software projects.',
    profile_image: '',
    contact_email: 'menuwankalhara@gmail.com',
    contact_location: 'Sri Lanka',
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills = [
      { name: 'Next.js', category: 'Frontend', percentage: 85, order: 0 },
      { name: 'React', category: 'Frontend', percentage: 90, order: 1 },
      { name: 'TypeScript', category: 'Frontend', percentage: 88, order: 2 },
      { name: 'Tailwind CSS', category: 'Frontend', percentage: 85, order: 3 },
      { name: 'NestJS', category: 'Backend', percentage: 80, order: 0 },
      { name: 'Spring Boot', category: 'Backend', percentage: 70, order: 1 },
      { name: 'Node.js', category: 'Backend', percentage: 85, order: 2 },
      { name: 'PostgreSQL', category: 'Database', percentage: 80, order: 0 },
      { name: 'MongoDB', category: 'Database', percentage: 75, order: 1 },
      { name: 'MySQL', category: 'Database', percentage: 78, order: 2 },
      { name: 'Kotlin', category: 'Mobile', percentage: 70, order: 0 },
    ];
    await prisma.skill.createMany({ data: skills });
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: 'Ladyfly',
          description: 'A modern web application built with full-stack technologies.',
          techStack: ['Next.js', 'NestJS', 'PostgreSQL'],
          githubUrl: 'https://github.com',
          liveUrl: 'https://example.com',
          featured: true,
          order: 0,
        },
        {
          title: 'Floranest',
          description: 'Plant marketplace platform with admin dashboard.',
          techStack: ['React', 'Node.js', 'MongoDB'],
          githubUrl: 'https://github.com',
          featured: true,
          order: 1,
        },
        {
          title: 'Personal Finance Tracker',
          description: 'Track income, expenses, and savings goals.',
          techStack: ['Next.js', 'TypeScript', 'Prisma'],
          githubUrl: 'https://github.com',
          order: 2,
        },
        {
          title: 'Expense Tracker',
          description: 'Simple expense tracking mobile-friendly app.',
          techStack: ['React', 'Firebase'],
          githubUrl: 'https://github.com',
          order: 3,
        },
      ],
    });
  }

  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          title: 'Started Programming',
          startDate: new Date('2024-01-01'),
          order: 0,
        },
        {
          title: 'MERN Projects',
          startDate: new Date('2025-01-01'),
          order: 1,
        },
        {
          title: 'Android Development',
          startDate: new Date('2025-06-01'),
          order: 2,
        },
        {
          title: 'Full Stack Development',
          startDate: new Date('2026-01-01'),
          order: 3,
        },
      ],
    });
  }

  const socialPlatforms = ['github', 'linkedin', 'tiktok', 'youtube', 'facebook'];
  for (const platform of socialPlatforms) {
    await prisma.socialLink.upsert({
      where: { platform },
      update: {},
      create: { platform, url: `https://${platform}.com/menuwan` },
    });
  }

  console.log('Seed completed');
  console.log(`Admin: ${email} / ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
