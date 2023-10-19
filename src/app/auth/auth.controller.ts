import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '~/common/decorators/http-methods';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, LoginResponseData } from './dto/login-user.dto';
import { HttpConflictExceptionEntity } from '~/filters/http/entities/http-conflict-exception';
import {
  CreateUserDto,
  CreateUserResponseData,
} from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register', { createdType: LoginResponseData })
  @ApiCreatedResponse({ type: LoginResponseData })
  @ApiConflictResponse({
    description: 'Erro ao cadastrar usuário!',
    type: HttpConflictExceptionEntity,
  })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseData> {
    const res = await this.authService.register(createUserDto);
    return res;
  }

  @Post('login', { createdType: LoginResponseData })
  @ApiCreatedResponse({ type: LoginResponseData })
  @ApiConflictResponse({
    description: 'E-mail ou senha inválidos',
    type: HttpConflictExceptionEntity,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseData> {
    const res = await this.authService.login(loginDto);
    return res;
  }
}
