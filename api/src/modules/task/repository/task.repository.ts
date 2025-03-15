import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/index.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.task.create({
      data,
      include: {
        created_by: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  async get() {
    return this.prisma.task.findMany({
      where: {
        solved: false,
      },
      include: {
        created_by: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
      include: {
        created_by: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        created_by: {
          omit: {
            password: true,
          },
        },
      },
    });
  }
}
