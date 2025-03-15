import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/index.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return this.prisma.user.findUnique({
      where: { email, password },
    });
  }
}
