import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '~/repositories/user.abstract';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository<UserEntity>) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.find(createUserDto.email);

    if (user) {
      throw new HttpException('Usuário já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userCreated = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    delete userCreated.password;
    return userCreated;
  }

  async findOne(email: string) {
    const user = await this.userRepository.find(email);

    if (!user) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new HttpException(
        'Usuários não encontrados!',
        HttpStatus.NOT_FOUND,
      );
    }

    return users;
  }
}
