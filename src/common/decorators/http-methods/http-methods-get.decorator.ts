import { applyDecorators, Get as BaseGet } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { HttpNotFoundExceptionEntity } from '~/filters/http/entities/http-not-found-exception copy 2';

export const Get = (
  route: string,
  {
    okType,
    okOptions,
    notFoundType,
    notFoundOptions,
  }: {
    okType?: ApiResponseMetadata['type'];
    okOptions?: Omit<ApiResponseOptions, 'type'>;
    notFoundType?: ApiResponseMetadata['type'];
    notFoundOptions?: Omit<ApiResponseOptions, 'type'>;
  },
) => {
  return applyDecorators(
    BaseGet(route),
    okType
      ? ApiOkResponse({
          type: okType,
          ...okOptions,
        })
      : () => null,
    ApiNotFoundResponse({
      type: notFoundType || HttpNotFoundExceptionEntity,
      ...notFoundOptions,
    }),
  );
};
