import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../upload/cloudinary.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return this.prisma.project.findMany({
      include: { images: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: dto,
      include: { images: true },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: { images: true },
    });
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    for (const image of project.images) {
      if (image.publicId) {
        await this.cloudinary.deleteImage(image.publicId).catch(() => undefined);
      }
    }
    return this.prisma.project.delete({ where: { id } });
  }

  async addImage(projectId: string, url: string, publicId?: string) {
    await this.findOne(projectId);
    return this.prisma.projectImage.create({
      data: { projectId, url, publicId },
    });
  }

  async removeImage(imageId: string) {
    const image = await this.prisma.projectImage.findUnique({
      where: { id: imageId },
    });
    if (!image) throw new NotFoundException('Image not found');
    if (image.publicId) {
      await this.cloudinary.deleteImage(image.publicId).catch(() => undefined);
    }
    return this.prisma.projectImage.delete({ where: { id: imageId } });
  }
}
