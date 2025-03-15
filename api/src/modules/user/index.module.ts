import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/services/prisma/index.service';
import { JwtAuthService } from 'src/services/auth/index.service';
import { AuthModule } from '../auth/index.module';
import { PrismaModule } from '../prisma/index.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UserModule {}
