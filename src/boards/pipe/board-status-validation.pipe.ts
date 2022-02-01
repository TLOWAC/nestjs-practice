import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { BoardStatusEnumType } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly boardStatusOptions = [
    BoardStatusEnumType.PUBLIC,
    BoardStatusEnumType.PRIVATE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isValidate(value))
      throw new BadRequestException(`${value} is not existed in status type}`);

    return value;
  }

  isValidate(value) {
    const result = this.boardStatusOptions.includes(value);
    return result;
  }
}
