import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const settings = await this.prisma.setting.findMany();

    return Object.fromEntries(
      settings.map((s: any) => [s.key, s.value])
    );
  }

  async upsert(key: string, value: string) {
    return this.prisma.setting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  async upsertMany(data: Record<string, string>) {
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.upsert(key, value),
      ),
    );

    return this.getAll();
  }
}