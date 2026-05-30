import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { UpsertSocialLinkDto } from './dto/social-link.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('social-links')
export class SocialLinksController {
  constructor(private socialLinksService: SocialLinksService) {}

  @Get()
  findAll() {
    return this.socialLinksService.findAll();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  upsertMany(@Body() links: UpsertSocialLinkDto[]) {
    return this.socialLinksService.upsertMany(links);
  }
}
