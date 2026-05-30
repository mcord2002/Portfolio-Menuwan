import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  getAll() {
    return this.settingsService.getAll();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  upsertMany(@Body() data: Record<string, string>) {
    return this.settingsService.upsertMany(data);
  }
}
