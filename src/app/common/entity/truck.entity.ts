import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Package } from './package.entity';

@Entity()
export class Truck {
  @PrimaryGeneratedColumn() public id: number;
  @CreateDateColumn() public createdAt: Date;
  /**
   * Related to truck packages
   */
  @OneToMany(type => Package, pack => pack.truck)
  public packages: Package[];
}
