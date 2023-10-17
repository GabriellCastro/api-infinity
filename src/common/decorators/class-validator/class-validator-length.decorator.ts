import { applyDecorators } from '@nestjs/common';
import { Length as BaseLength, ValidationOptions } from 'class-validator';

export const Length = (
  min: number,
  max: number,
  name: string,
  validationOptions?: ValidationOptions,
) => {
  return applyDecorators(
    BaseLength(min, max, {
      ...validationOptions,
      message: `Campo ${name} deve ter entre ${min} e ${max} caracteres.`,
    }),
  );
};
