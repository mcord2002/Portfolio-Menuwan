import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { mkdir, writeFile, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class CloudinaryService {
  private cloudinaryReady = false;

  constructor(private config: ConfigService) {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');

    const configured =
      cloudName &&
      apiKey &&
      apiSecret &&
      cloudName !== 'your-cloud-name' &&
      apiKey !== 'your-api-key' &&
      apiSecret !== 'your-api-secret';

    if (configured) {
      cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
      this.cloudinaryReady = true;
    }
  }

  private getLocalBaseUrl() {
    return (
      this.config.get<string>('API_URL') ??
      `http://localhost:${this.config.get('PORT') ?? 4000}`
    );
  }

  async uploadImage(
    file: Express.Multer.File,
    folder = 'portfolio',
  ): Promise<{ url: string; publicId: string }> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('No image file received');
    }

    if (this.cloudinaryReady) {
      return this.uploadToCloudinary(file, folder);
    }

    return this.uploadLocally(file);
  }

  private uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(
              new InternalServerErrorException(
                error?.message ?? 'Cloudinary upload failed',
              ),
            );
            return;
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        },
      );
      stream.end(file.buffer);
    });
  }

  private async uploadLocally(file: Express.Multer.File) {
    const uploadsDir = join(process.cwd(), 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const ext = extname(file.originalname) || '.jpg';
    const filename = `${randomUUID()}${ext}`;
    await writeFile(join(uploadsDir, filename), file.buffer);

    return {
      url: `${this.getLocalBaseUrl()}/uploads/${filename}`,
      publicId: `local:${filename}`,
    };
  }

  async deleteImage(publicId: string): Promise<void> {
    if (publicId.startsWith('local:')) {
      const filename = publicId.replace('local:', '');
      await unlink(join(process.cwd(), 'uploads', filename)).catch(() => undefined);
      return;
    }

    if (this.cloudinaryReady) {
      await cloudinary.uploader.destroy(publicId).catch(() => undefined);
    }
  }
}
