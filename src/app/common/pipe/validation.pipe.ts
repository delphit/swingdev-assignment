import { Injectable, ArgumentMetadata, HttpStatus, Pipe, PipeTransform } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { plainToClass, classToPlain } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';
import { HttpValidationException } from '../exceptions/http-validation.exceptions';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private isTransformEnabled: boolean;
  private validatorOptions: ValidatorOptions;

  constructor(options?: ValidationPipeOptions) {
    options = options || {};
    const { transform, ...validatorOptions } = options;
    this.isTransformEnabled = !!transform;
    this.validatorOptions = validatorOptions;
  }
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }
    const entity = plainToClass(metatype, value);
    const errors = await validate(entity, this.validatorOptions);
    if (errors.length > 0) {
      console.log('errors', errors);
      throw new HttpValidationException(`Validation failed`, HttpStatus.BAD_REQUEST, errors);
    }
    return this.isTransformEnabled
      ? entity
      : Object.keys(this.validatorOptions).length > 0
        ? classToPlain(entity)
        : value;
  }

  private toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype, type } = metadata;
    if (type === 'custom') {
      return false;
    }
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type) && !isNil(metatype);
  }
}
