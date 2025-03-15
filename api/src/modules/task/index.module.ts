import { Module } from '@nestjs/common';
import { TaskRepository } from './repository/task.repository';
import { PrismaService } from 'src/services/prisma/index.service';

@Module({
  imports: [],
  providers: [PrismaService, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule {}
