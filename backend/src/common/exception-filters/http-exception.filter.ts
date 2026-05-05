import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import e, { Response } from 'express';
import { APIResponse } from '../types/APIRespone';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal server error';
    let error: { name: string } = {
      name: 'Error',
    };

    if (exception instanceof Error) {
      errorMessage = exception.message;
      error = { name: exception.name };
    }

    const body: APIResponse<null> = {
      success: false,
      message: errorMessage,
      data: null,
      error,
    };

    response.status(status).json(body);
  }
}
