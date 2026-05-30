import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageLoader } from '@/components/layout/PageLoader';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Skills } from '@/components/home/Skills';
import { Projects } from '@/components/home/Projects';
import { ExperienceSection } from '@/components/home/Experience';
import { Certificates } from '@/components/home/Certificates';
import { ContentCreator } from '@/components/home/ContentCreator';
import { Contact } from '@/components/home/Contact';
import { publicApi } from '@/lib/api';
import type { Settings } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [settings, projects, skills, experiences, certificates, socialLinks] =
    await Promise.all([
      publicApi.getSettings().catch(() => ({})),
      publicApi.getProjects().catch(() => []),
      publicApi.getSkills().catch(() => []),
      publicApi.getExperiences().catch(() => []),
      publicApi.getCertificates().catch(() => []),
      publicApi.getSocialLinks().catch(() => []),
    ]);

  const siteSettings = settings as Settings;

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar contactEmail={siteSettings.contact_email} />
      <main className="relative z-[2]">
        <Hero
          settings={siteSettings}
          projectCount={projects.length}
          skillCount={skills.length}
          experienceCount={experiences.length}
        />
        <About settings={siteSettings} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <ExperienceSection experiences={experiences} />
        <Certificates certificates={certificates} />
        <ContentCreator links={socialLinks} />
        <Contact settings={siteSettings} />
      </main>
      <Footer />
    </>
  );
}
