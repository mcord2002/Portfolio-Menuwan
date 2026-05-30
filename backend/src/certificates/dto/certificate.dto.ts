import { IsString, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imagePublicId?: string;

  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateCertificateDto extends CreateCertificateDto {}
