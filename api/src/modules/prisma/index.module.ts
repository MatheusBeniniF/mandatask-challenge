import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/index.service';
import { TaskRepository } from '../task/repository/task.repository';

@Module({
  imports: [],
  providers: [PrismaService, TaskRepository],
  exports: [PrismaService, TaskRepository],
})
export class PrismaModule {}
