import {
  ExceptionFilter,
  HttpException,
  Catch,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { LogicError } from '../exceptions/logic.exception';
import { APIError } from '../helpers';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Catch(NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException, Error, LogicError)
export class AnyExceptionFilter implements ExceptionFilter {
  /**
   * Catch passed exception
   */
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof NotFoundException) {
      const { message } = exception.message;
      return response.status(HttpStatus.NOT_FOUND).send(new APIError(message));
    } else if (exception instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST);
    } else if (exception instanceof ForbiddenException) {
      response.status(HttpStatus.FORBIDDEN);
    } else if (exception instanceof UnauthorizedException) {
      return response.status(HttpStatus.UNAUTHORIZED).send(new APIError('Unauthorized', 401));
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    response.send({ success: false, message: exception.message });
  }
}
