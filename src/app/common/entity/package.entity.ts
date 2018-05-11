import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { Truck } from './truck.entity';
import { Order } from './order.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn() public id: number;
  @CreateDateColumn({ select: false }) public createdAt: Date;
  /**
   * Package weight
   */
  @Column('decimal') public weight: number;
  /**
   * Client id
   */
  @Column() public client: string;
  /**
   * Order which will carry package
   */
  @ManyToOne(type => Truck, truck => truck.load)
  public truck?: Truck;
  /**
   * Order which package belongs
   */
  @ManyToOne(type => Order, order => order.packages)
  public order?: Order;
}
