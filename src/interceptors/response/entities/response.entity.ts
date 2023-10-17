import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponseEntity<T> {
  @ApiProperty({ example: 200 })
  abstract statusCode: number;

  @ApiProperty()
  abstract message: string;

  @ApiProperty()
  abstract error: string;

  @ApiProperty()
  abstract data: T | T[];
}
