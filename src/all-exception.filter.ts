import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-loggers/my-loggers.service';
import { Request, Response } from 'express';
import { errorResponseObj } from './types/data.types';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);
  constructor(private readonly myLoggerService: MyLoggerService) {
    super();
  }

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const logMessage = `Exception thrown: ${JSON.stringify(message)}`;
    this.logger.error(
      logMessage,
      exception instanceof Error ? exception.stack : '',
    );

    const responseBody: errorResponseObj = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: logMessage,
      error: '',
    };

    // Send the response
    response.status(status).json(responseBody);
  }
}
