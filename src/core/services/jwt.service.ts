import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  providerId: string;
}

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET || 'hubconductor-secret-key';
  private readonly expiresIn = '24h';

  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secretKey) as JwtPayload;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  getProviderIdFromToken(token: string): string {
    const payload = this.verifyToken(token);
    return payload.providerId;
  }
} 