import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationErrorException } from './validation-error.exception';

@Catch(ValidationErrorException)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationErrorException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const constraints = exception.getData()[0].constraints;

    response.status(422).json({
      statusCode: 422,
      message: constraints[Object.keys(constraints)[0]],
      error: exception.message,
      data: null,
    });
  }
}
