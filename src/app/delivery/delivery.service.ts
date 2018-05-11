import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from '../common/entity/package.entity';
import { Truck } from '../common/entity/truck.entity';
import { Order } from '../common/entity/order.entity';
import { mergeByKeys } from '../common/utils';
import { TRUNK_MAX_LOAD } from '../common/config';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Truck) private truckRepository: Repository<Truck>,
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  /**
   * Create new order
   * @returns {Promise<never>}
   */
  public async createOrder() {
    try {
      const newOrder = new Order();
      return await this.orderRepository.save(newOrder);
    } catch (err) {
      return Promise.reject("Can't save order");
    }
  }

  /**
   * Save packages into DB
   * @param packages
   * @param order
   * @returns {Promise<any>}
   */
  public async savePackages(packages, order) {
    try {
      return await Promise.all(
        packages.map(async data => {
          const { id, weight } = data;
          const newPackage = new Package();
          mergeByKeys(newPackage, { client: id, weight, order });
          return await this.packageRepository.save(newPackage);
        }),
      );
    } catch (err) {
      return Promise.reject("Can't save packages into DB");
    }
  }

  /**
   * Create trunk
   * @param payload
   * @returns {Promise<never>}
   */
  public async createTruck(payload) {
    try {
      const { load } = payload;
      const newTruck = new Truck();
      mergeByKeys(newTruck, { load });
      const truck = await this.truckRepository.save(newTruck);
      return {
        truckID: truck.id,
        load: truck.load.map(pack => ({
          id: pack.id,
          client: pack.client,
          weight: pack.weight,
        })),
      };
    } catch (err) {
      return Promise.reject("Can't create trunk");
    }
  }

  /**
   * Fill trunks
   * @param packages
   * @returns {Promise<never>}
   */
  public async fillTrucks(packages) {
    try {
      const trucks = [];
      const sortedPackages = this.sortPackages(packages);
      sortedPackages.forEach(pack => {
        const isAvailableTruck = this.isAvailableTruck(trucks, pack);
        if (!pack.loaded && isAvailableTruck) {
          isAvailableTruck.load.push(pack);
        } else {
          trucks.push({
            load: [pack],
          });
        }
      });
      return await Promise.all(
        trucks.map(async truck => {
          return await this.createTruck(truck);
        }),
      );
    } catch (err) {
      return Promise.reject("Can't fill trunks");
    }
  }

  /**
   * Find available truck
   * @param trucks
   * @param pack
   * @returns {any}
   */
  private isAvailableTruck(trucks, pack) {
    return trucks.find(truck => {
      const totalWeight = truck.load.reduce(
        (prev, next) => prev + next.weight,
        0,
      );
      return totalWeight + pack.weight > TRUNK_MAX_LOAD ? false : true;
    });
  }

  /**
   * Sort packages by weight
   * @param packages
   * @returns {any}
   */
  private sortPackages(packages) {
    return packages.sort((prev, next) => prev.weight < next.weight);
  }
  /**
   * Calc trucks price
   * @param packages
   * @returns {any}
   */
  public calculatePrice(packages) {
    return packages.reduce(
      (prevVal, nextLoad) => prevVal + (nextLoad.weight > 400 ? 2 + 0.005 * nextLoad.weight : 0.01 * nextLoad.weight), 0,
    );
  }
}
