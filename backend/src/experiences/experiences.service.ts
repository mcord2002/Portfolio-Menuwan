import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { startDate: 'desc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Experience not found');
    return item;
  }

  create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({
      where: { id },
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.experience.delete({ where: { id } });
  }
}
