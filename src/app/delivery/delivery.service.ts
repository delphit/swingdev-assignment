import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from '../common/entity/package.entity';
import { Truck } from '../common/entity/truck.entity';
import { mergeByKeys } from '../common/utils';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(Truck) private truckRepository: Repository<Truck>,
  ) {}

  /**
   * Save packages into DB
   * @param packages
   * @returns {Promise<any>}
   */
  public async savePackages(packages) {
    try {
      return await Promise.all(
        packages.map(async data => {
          const { id, weight } = data;
          const order = new Package();
          mergeByKeys(order, { id, weight });
          return await this.packageRepository.create(order);
        }),
      );
    } catch (err) {
      return Promise.reject("Can't save packages into DB");
    }
  }

  /**
   * Create trunk
   * @param packages
   * @returns {Promise<never>}
   */
  public async createTrunk(packages) {
    try {
      await this.truckRepository.save(packages);
    } catch (err) {
      return Promise.reject("Can't create trunk");
    }
  }

  /**
   * Fill trunks
   * @param packages
   * @returns {Promise<never>}
   */
  public async fillTrunks(packages) {
    try {
    } catch (err) {
      return Promise.reject("Can't fill trunks");
    }
  }
  /**
   * Calc packages price
   * @param packages
   * @returns {any}
   */
  calculatePrice(packages) {
    return packages.reduce(
      ({ weight }) => (weight > 400 ? 2 + 0.005 * weight : 0.01 * weight),
      0,
    );
  }
}
