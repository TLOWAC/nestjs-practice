import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCrendentialDto: AuthCredentialDto) {
    const user = await this.create(authCrendentialDto);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('username already used');
      else {
        throw new InternalServerErrorException();
      }
    }
  }
}
