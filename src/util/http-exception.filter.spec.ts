import { HttpException, ArgumentsHost } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { FastifyReply } from 'fastify';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockReply: Partial<FastifyReply>;
  let mockHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockReply,
      }),
    } as any;
  });

  it('deve retornar mensagem como array quando for string', () => {
    const exception = new HttpException(
      { message: 'erro simples', error: 'Bad Request' },
      400,
    );
    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      statusCode: 400,
      message: ['erro simples'],
      error: 'Bad Request',
    });
  });

  it('deve retornar mensagem como array quando já for array', () => {
    const exception = new HttpException(
      { message: ['erro1', 'erro2'], error: 'Bad Request' },
      400,
    );
    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      statusCode: 400,
      message: ['erro1', 'erro2'],
      error: 'Bad Request',
    });
  });
});
