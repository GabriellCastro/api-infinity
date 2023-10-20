import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/services/database/prisma.service';
import { Task } from '@prisma/client';
import { TaskRepository } from '../task.abstract';

@Injectable()
export class PrismaTaskRepository implements TaskRepository<Task> {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Task): Promise<Task> {
    const task = await this.prisma.task.create({ data });
    return task;
  }

  async update(data: Task, id: string): Promise<Task> {
    return await this.prisma.task.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }

  async find(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return task;
  }

  async findAll(userId: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      include: { user: true, creator: true },
      where: { OR: [{ userId }, { creatorId: userId }] },
    });
  }
}
