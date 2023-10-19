import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/services/database/prisma.service';
import { User } from '@prisma/client';
import { UserRepository } from '../user.abstract';

@Injectable()
export class PrismaUserRepository implements UserRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({ data });

    return user;
  }

  async update(data: User, id: string): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async find(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tasks: true },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
