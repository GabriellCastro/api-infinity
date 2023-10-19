import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
} from '~/common/decorators/class-validator';
import { ResponseEntity } from '~/interceptors/response/entities/response.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty('Nome')
  @IsString()
  @Length(3, 100, 'Nome')
  name: string;

  @ApiProperty()
  @IsNotEmpty('E-mail')
  @IsEmail()
  @Length(3, 100, 'E-mail')
  email: string;

  @ApiProperty()
  @IsNotEmpty('Senha')
  @IsString()
  @Length(6, 100, 'Senha')
  password: string;
}

export class CreateUserResponseData {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: string;
}

export class CreateUserResponseDto
  implements ResponseEntity<CreateUserResponseData>
{
  @ApiProperty()
  data: CreateUserResponseData;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty()
  error: string;
}
