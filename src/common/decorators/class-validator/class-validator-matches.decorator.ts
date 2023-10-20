import { applyDecorators } from '@nestjs/common';
import { Matches as BaseMatches } from 'class-validator';

export const Matches = (regex: RegExp, name: string) => {
  return applyDecorators(
    BaseMatches(regex, { message: `Campo ${name} é inválido!` }),
  );
};
