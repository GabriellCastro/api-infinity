import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '~/app/users/entities/user.entity';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
} from '~/common/decorators/class-validator';
import { ResponseEntity } from '~/interceptors/response/entities/response.entity';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty('E-mail')
  email: string;

  @IsString()
  @IsNotEmpty('Senha')
  password: string;
}

export class LoginResponseData {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserEntity;
}

export class LoginResponseDto implements ResponseEntity<LoginResponseData> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Login realizado com sucesso!' })
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  data: LoginResponseData;
}
