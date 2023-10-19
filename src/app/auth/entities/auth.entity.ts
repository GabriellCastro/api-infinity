import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    name: string;
  };
}
