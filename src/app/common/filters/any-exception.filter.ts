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
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Catch(NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException)
export class AnyExceptionFilter implements ExceptionFilter {
  /**
   * Catch passed exception
   */
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof NotFoundException) {
      return response.status(HttpStatus.NOT_FOUND);
    } else if (exception instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST);
    } else if (exception instanceof ForbiddenException) {
      response.status(HttpStatus.FORBIDDEN);
    } else if (exception instanceof UnauthorizedException) {
      return response.status(HttpStatus.UNAUTHORIZED);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    response.send({ success: false, message: exception.message });
  }
}
