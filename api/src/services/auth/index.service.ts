import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: 'secretKey',
    });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token, { secret: 'secretKey' });
  }
}
