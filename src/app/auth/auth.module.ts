import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '~/services/database/prisma.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '~/repositories/user.abstract';
import { PrismaUserRepository } from '~/repositories/prisma/prisma-user.repository';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    PassportModule,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
