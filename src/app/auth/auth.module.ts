import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '~/services/database/prisma.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '~/repositories/user.abstract';
import { PrismaUserRepository } from '~/repositories/prisma/prisma-user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
