import { HttpStatus } from '@nestjs/common';

export class APIError {
  public name: any;
  public status: number;
  public success: boolean;
  public message: string;
  public content: object;

  public constructor(message, status = HttpStatus.INTERNAL_SERVER_ERROR, content = {}) {
    this.status = status;
    this.success = false;
    this.name = this.constructor.name;
    this.message = message;
    this.content = content;
  }
}
