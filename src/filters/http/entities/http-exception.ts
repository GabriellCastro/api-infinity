import { ApiProperty } from '@nestjs/swagger';

type Nullable<T> = T | null;

export class HttpExceptionEntity {
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly error: string;

  @ApiProperty({ nullable: true })
  readonly data: Nullable<any>;
}
