import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Package } from './package.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() public id: number;
  @CreateDateColumn() public createdAt: Date;
  /**
   * Related packages
   */
  @OneToMany(type => Package, pack => pack.order)
  public packages: Package[];
}
