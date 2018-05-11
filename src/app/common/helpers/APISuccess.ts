import { HttpStatus } from '@nestjs/common';

export class APISuccess {
  public status: number;
  public success: boolean;
  public message: string;
  public content: object;

  public constructor(content = {}, message = 'Success', status = HttpStatus.OK) {
    this.status = status;
    this.success = true;
    this.message = message;
    this.content = content;
  }
}
