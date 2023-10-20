import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from '~/repositories/task.abstract';
import { PrismaTaskRepository } from '~/repositories/prisma/prisma-task.repository';
import { PrismaService } from '~/services/database/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    { provide: TaskRepository, useClass: PrismaTaskRepository },
  ],
})
export class TasksModule {}
