import { TaskEntity } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseEntity } from '~/interceptors/response/entities/response.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from '~/common/decorators/class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty('Title')
  @IsString()
  @Length(3, 100, 'Title')
  title: string;

  @ApiProperty()
  @IsNotEmpty('Description')
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty('Status')
  @IsString()
  @Length(3, 100, 'Status')
  status: string;

  @ApiProperty()
  @IsNotEmpty('Creator')
  @IsString()
  creatorId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;
}

export class CreateTaskResponseData {
  @ApiProperty()
  task: TaskEntity;
}

export class CreateTaskResponseDto
  implements ResponseEntity<CreateTaskResponseData>
{
  @ApiProperty()
  data: CreateTaskResponseData;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty()
  error: string;
}
