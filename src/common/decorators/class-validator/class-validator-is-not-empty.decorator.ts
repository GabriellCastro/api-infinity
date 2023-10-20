import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty as BaseIsNotEmpty } from 'class-validator';

export const IsNotEmpty = (name: string) => {
  return applyDecorators(
    BaseIsNotEmpty({ message: `Campo ${name} é obrigatório!` }),
  );
};
