import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateExperienceDto extends CreateExperienceDto {}
