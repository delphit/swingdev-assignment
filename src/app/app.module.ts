import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './delivery/delivery.module';

import { DB_CONFIG } from './common/config';

@Module({
  // @ts-ignore
  imports: [TypeOrmModule.forRoot(DB_CONFIG), DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
