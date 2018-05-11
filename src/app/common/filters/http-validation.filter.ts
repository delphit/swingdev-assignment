import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { Catch } from '@nestjs/common';
import { HttpValidationException } from '../exceptions/http-validation.exceptions';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Catch(HttpValidationException)
export class HttpValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpValidationException, host: ArgumentsHost) {
    const statusCode = exception.getStatus();
    const message = exception.getResponse();
    const errors = exception.getMessage();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
