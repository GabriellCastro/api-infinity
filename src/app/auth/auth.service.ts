import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  CreateUserDto,
  CreateUserResponseData,
} from '../users/dto/create-user.dto';
import { LoginDto, LoginResponseData } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseData> {
    const user = await this.usersService.create(createUserDto);

    console.log(user, 'Register Auth Service');

    if (!user) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, sub: user.id };

    delete user.password;

    return {
      token: this.jwtService.signAsync(payload),
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseData> {
    const user = await this.usersService.findOne(loginDto.email);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'E-mail ou Senha inválidos!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email, sub: user.id };

    delete user.password;

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
