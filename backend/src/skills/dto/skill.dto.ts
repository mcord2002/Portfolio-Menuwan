import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  percentage?: number;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateSkillDto extends CreateSkillDto {}
