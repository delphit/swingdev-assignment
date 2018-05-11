import { Controller, Post, Body } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { APIError, APISuccess } from '../common/helpers';
import { CreateOrderDTO } from './delivery.dto';

@Controller('/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('/create')
  public async createOrder(@Body() payload: CreateOrderDTO) {
    try {
      const packages = await this.deliveryService.savePackages(payload.packages);
      const trunks = await this.deliveryService.fillTrunks(packages);
      return new APISuccess();
    } catch (err) {
      return new APIError("Can't create new order");
    }
  }
}
