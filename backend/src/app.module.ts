import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { CertificatesModule } from './certificates/certificates.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { ContactModule } from './contact/contact.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    SkillsModule,
    ExperiencesModule,
    CertificatesModule,
    SocialLinksModule,
    ContactModule,
    SettingsModule,
    DashboardModule,
    UploadModule,
  ],
})
export class AppModule {}
