import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // => Repository 의 경우 *.module.ts 에서 따로 DI 를 해주지 않음으로 @InjectRepository() 함수를 사용하여 DI 해야 사용할 수 있다.
    private readonly userRepository: UserRepository,
  ) {}

  signUp(authCrendentialDto: AuthCredentialDto) {
    const user = this.userRepository.createUser(authCrendentialDto);
    return user;
  }

  async findOneByName(username: string) {
    const user = this.userRepository.findOne({ username: username });
    return user;
  }
}
