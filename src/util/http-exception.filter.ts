import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const { message, error } = exception.getResponse() as {
      message: string | string[];
      error: string;
    };

    response.status(status).send({
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      error: error,
    });
  }
}
