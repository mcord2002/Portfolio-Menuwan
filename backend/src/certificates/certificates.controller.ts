import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto, UpdateCertificateDto } from './dto/certificate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCertificateDto) {
    return this.certificatesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
    return this.certificatesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(id);
  }
}
