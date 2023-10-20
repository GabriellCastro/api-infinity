import { applyDecorators, Post as BasePost } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationError } from '~/filters/validation/entities/validation-error.entity';

export const Post = (
  route: string,
  {
    createdType,
    notFoundType,
    validateType,
    conflictType,
  }: {
    createdType?: ApiResponseMetadata['type'];
    notFoundType?: ApiResponseMetadata['type'];
    validateType?: ApiResponseMetadata['type'];
    conflictType?: ApiResponseMetadata['type'];
  },
) => {
  return applyDecorators(
    BasePost(route),
    ApiUnprocessableEntityResponse({
      type: validateType || ValidationError,
    }),
    conflictType
      ? ApiNotFoundResponse({
          type: notFoundType,
        })
      : () => null,
    conflictType ? ApiConflictResponse({ type: conflictType }) : () => null,
    createdType ? ApiCreatedResponse({ type: createdType }) : () => null,
  );
};
