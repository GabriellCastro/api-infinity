import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  creatorId?: string;
}
