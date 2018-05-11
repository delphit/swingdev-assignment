import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../common/entity/order.entity';
import { Package } from '../common/entity/package.entity';
import { Truck } from '../common/entity/truck.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Package, Truck])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
