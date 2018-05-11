import {
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderDTO {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsNumber()
  @Min(0)
  @Max(500)
  public weight: number;

  constructor(id: number, weight: number) {
    this.id = id;
    this.weight = weight;
  }
}

export class CreateOrderDTO {
  @ValidateNested({ each: true })
  public packages: OrderDTO[];
}
