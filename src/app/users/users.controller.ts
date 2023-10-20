import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiConflictResponse } from '@nestjs/swagger';
import { Get } from '~/common/decorators/http-methods';
import { HttpConflictExceptionEntity } from '~/filters/http/entities/http-conflict-exception';
import { CreateUserResponseData } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all', { okType: CreateUserResponseData })
  @ApiConflictResponse({
    description: 'Erro ao buscar usuários!',
    type: HttpConflictExceptionEntity,
  })
  findAll() {
    return this.usersService.findAll();
  }
}
