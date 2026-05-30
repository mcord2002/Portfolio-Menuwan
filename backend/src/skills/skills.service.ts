import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
  }

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  create(dto: CreateSkillDto) {
    return this.prisma.skill.create({ data: dto });
  }

  async update(id: string, dto: UpdateSkillDto) {
    await this.findOne(id);
    return this.prisma.skill.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.skill.delete({ where: { id } });
  }
}
