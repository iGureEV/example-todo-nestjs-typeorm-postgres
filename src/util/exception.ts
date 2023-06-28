import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

export const ERROR_NOT_FOUND_TASK = 'No task found for given Id';
export const ERROR_NOT_FOUND_GROUP = 'No group found for given Id';

export function catchException(err: HttpException): HttpException {
  if (0 <= err.message.indexOf('long for type character varying')) {
    throw new HttpException(
      {
        message: err.message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return err;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
