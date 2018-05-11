import {
  IsNotEmpty,
  IsNumber,
  Max, MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderDTO {
  @MaxLength(15)
  @IsNotEmpty()
  public id: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(500)
  public weight: number;
}

export class CreateOrderDTO {
  @ValidateNested()
  @Type(() => OrderDTO)
  public packages: OrderDTO[];
}
