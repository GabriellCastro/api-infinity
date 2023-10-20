import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationErrorException extends HttpException {
  data: any;

  constructor(data: any) {
    super('ValidationException.', HttpStatus.UNPROCESSABLE_ENTITY);
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
