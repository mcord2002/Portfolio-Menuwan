import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [projects, messages, skills, certificates] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.contactMessage.count(),
      this.prisma.skill.count(),
      this.prisma.certificate.count(),
    ]);

    return { projects, messages, skills, certificates };
  }
}
