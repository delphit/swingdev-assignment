import { Get, Controller } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  root(): string {
    return this.deliveryService.root();
  }
}
