import { Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';

interface DatabaseErrorMessage {
  message: string;
  status: number;
}

@Catch(Error)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DatabaseExceptionFilter.name);

  public catch(exception, response) {
    this.logErrorMessage(exception);
    let errorMessage: DatabaseErrorMessage = {
      message: 'Unknow Exception',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception.name === 'ValidationError') {
      errorMessage = this.formatMongooseError(exception);
    }

    response.status(errorMessage.status).json({ message: errorMessage.message });
  }

  private formatMongooseError(exception) {
    const errorMessage: DatabaseErrorMessage = {
      message: 'Validation Error',
      status: HttpStatus.BAD_REQUEST,
    };

    if ('errors' in exception) {
      errorMessage.message = Object.keys(exception.errors)
        .map(key => exception.errors[key].message)
        .join(' ');
    }

    return errorMessage;
  }

  private logErrorMessage(exception) {
    let errorMessage = '';
    Reflect.ownKeys(exception).forEach(k => {
      errorMessage += `${k}: ${exception[k]}/n`;
    });

    this.logger.log(errorMessage);
  }
}
