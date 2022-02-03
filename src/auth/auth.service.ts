import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // => Repository 의 경우 *.module.ts 에서 따로 DI 를 해주지 않음으로 @InjectRepository() 함수를 사용하여 DI 해야 사용할 수 있다.
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(authCrendentialDto: AuthCredentialDto) {
    const user = this.userRepository.createUser(authCrendentialDto);
    return user;
  }
  // NOTE: Repository 에는 DB CRUD 등의 용도의 로직만을 사용
  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    const user = await this.userRepository.findOne({ username: username });
    const hashedPassword = user.password;

    const isMatch = bcryptjs.compareSync(password, hashedPassword);

    if (user && isMatch) {
      // generate user token
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('no matching user exist');
    }
  }

  async findOneByName(username: string) {
    const user = this.userRepository.findOne({ username: username });
    return user;
  }
}
