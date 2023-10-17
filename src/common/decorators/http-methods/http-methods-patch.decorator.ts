import {
  applyDecorators,
  Patch as BasePatch,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationError } from '~/filters/validation/entities/validation-error.entity';

export const Patch = (route: string, successOptions: ApiResponseOptions) => {
  return applyDecorators(
    SetMetadata('route', route),
    BasePatch(route),
    ApiUnprocessableEntityResponse({
      description: 'Erro de validação.',
      type: ValidationError,
    }),
    ApiResponse(successOptions),
  );
};
