import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsOptional()
  @ValidateIf((o: CreateProjectDto) => !!o.githubUrl)
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @ValidateIf((o: CreateProjectDto) => !!o.liveUrl)
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateProjectDto extends CreateProjectDto {}
