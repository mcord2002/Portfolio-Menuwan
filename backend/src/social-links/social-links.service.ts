import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSocialLinkDto } from './dto/social-link.dto';

@Injectable()
export class SocialLinksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.socialLink.findMany({ orderBy: { platform: 'asc' } });
  }

  upsert(dto: UpsertSocialLinkDto) {
    return this.prisma.socialLink.upsert({
      where: { platform: dto.platform },
      create: dto,
      update: { url: dto.url },
    });
  }

  upsertMany(links: UpsertSocialLinkDto[]) {
    return Promise.all(links.map((link) => this.upsert(link)));
  }
}
