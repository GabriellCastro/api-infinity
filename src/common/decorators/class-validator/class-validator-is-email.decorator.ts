import { applyDecorators } from '@nestjs/common';
import { IsEmail as BaseIsEmail, ValidationOptions } from 'class-validator';

export const IsEmail = (validationOptions?: ValidationOptions) => {
  return applyDecorators(
    BaseIsEmail({}, { ...validationOptions, message: 'Email inválido!' }),
  );
};
