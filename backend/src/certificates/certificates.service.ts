import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../upload/cloudinary.service';
import { CreateCertificateDto, UpdateCertificateDto } from './dto/certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return this.prisma.certificate.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.certificate.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }

  create(dto: CreateCertificateDto) {
    return this.prisma.certificate.create({ data: dto });
  }

  async update(id: string, dto: UpdateCertificateDto) {
    await this.findOne(id);
    return this.prisma.certificate.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    if (item.imagePublicId) {
      await this.cloudinary.deleteImage(item.imagePublicId).catch(() => undefined);
    }
    return this.prisma.certificate.delete({ where: { id } });
  }
}
