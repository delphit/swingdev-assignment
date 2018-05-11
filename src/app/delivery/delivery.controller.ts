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
      const order = await this.deliveryService.createOrder();
      const packages = await this.deliveryService.savePackages(payload.packages, order);
      const trucks = await this.deliveryService.fillTrucks(packages);
      const price = trucks.reduce((prev, nextTruck) => prev + this.deliveryService.calculatePrice(nextTruck.load), 0).toFixed(2);
      return new APISuccess({ price, trucks });
    } catch (err) {
      return new APIError(err);
    }
  }
}
