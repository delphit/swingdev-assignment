import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryService {
  root(): string {
    return 'Hello World!';
  }
}
