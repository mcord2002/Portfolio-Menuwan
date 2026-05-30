import { IsString, IsUrl } from 'class-validator';

export class UpsertSocialLinkDto {
  @IsString()
  platform: string;

  @IsUrl()
  url: string;
}
