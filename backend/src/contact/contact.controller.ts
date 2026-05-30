import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.contactService.create(dto);
  }

  @Get('messages')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Delete('messages/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
