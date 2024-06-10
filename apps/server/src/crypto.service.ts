import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  randomBytes,
  scryptSync,
  createCipheriv,
  createDecipheriv,
} from 'crypto';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  generateSalt() {
    return randomBytes(16).toString('hex');
  }

  encryptEventId(eventId: number, salt: string) {
    const key = scryptSync(this.getSecret(), salt, 32);
    const cipher = createCipheriv('aes-256-cbc', key, this.getIv());
    let encrypted = cipher.update(eventId.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decryptEventId(encryptedEventId: string, salt: string) {
    const key = scryptSync(this.getSecret(), salt, 32);
    const decipher = createDecipheriv('aes-256-cbc', key, this.getIv());
    let decrypted = decipher.update(encryptedEventId, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return Number(decrypted);
  }

  private getSecret(): string {
    const secret = this.configService.get<string>('EVENT_URL_SECRET');

    if (!secret) {
      throw new Error('Missing EVENT_URL_SECRET');
    }

    return secret;
  }

  private getIv(): string {
    const secret = this.configService.get<string>('EVENT_URL_SECRET_IV');

    if (!secret) {
      throw new Error('Missing EVENT_URL_SECRET_IV');
    }

    return secret;
  }
}
