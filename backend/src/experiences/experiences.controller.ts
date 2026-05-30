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
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(private experiencesService: ExperiencesService) {}

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiencesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}
