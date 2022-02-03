import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = await this.create({
      username: username,
      password: hashedPassword,
    });

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
