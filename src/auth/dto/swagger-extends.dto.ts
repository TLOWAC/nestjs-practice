import { PickType } from '@nestjs/swagger';

import { User } from '../user.entity';

export class SwaggerExtendDto extends PickType(User, [
  'username',
  'password',
] as const) {}
