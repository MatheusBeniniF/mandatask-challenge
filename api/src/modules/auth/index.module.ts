import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthService } from 'src/services/auth/index.service';
import { JwtStrategy } from 'src/shared/utils/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [JwtAuthService, JwtStrategy, JwtService],
  exports: [JwtAuthService],
})
export class AuthModule {}
