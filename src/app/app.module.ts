import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ValidationErrorFilter } from '~/filters/validation/validation-error.filter';
import { HttpExceptionFilter } from '~/filters/http/http-exception.filter';
import { ResponseInterceptor } from '~/interceptors/response/response.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.CLIENT_JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
  ],
  exports: [CacheModule.register()],
})
export class AppModule {}
