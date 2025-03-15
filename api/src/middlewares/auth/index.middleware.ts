import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret: 'secretKey' });
      const jtwStrategy = new JwtStrategy();
      jtwStrategy.validate(decoded);
      req.user = decoded;


    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
