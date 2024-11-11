import { ExceptionFilter, Catch, ArgumentsHost, ConflictException } from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintError } from 'sequelize';

@Catch(UniqueConstraintError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: UniqueConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Customize the error response
    response.status(409).json({
      statusCode: 409,
      message: 'A record with the same unique constraint already exists.',
      errors: exception.errors.map((err) => err.message),
    });
  }
}
