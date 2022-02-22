import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

import { AuthCredentialDto, AuthSignUpDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // => Repository 의 경우 *.module.ts 에서 따로 DI 를 해주지 않음으로 @InjectRepository() 함수를 사용하여 DI 해야 사용할 수 있다.
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /* --------------------------------- 로그인 함수 --------------------------------- */
  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    const user = await this.userRepository.findOne({ username: username });
    const hashedPassword = user.password;
    const isMatch = bcryptjs.compareSync(password, hashedPassword);

    if (user && isMatch) {
      const payload = {
        username: username,
        email: user.email,
        role: user.role,
      };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('no matching user exist');
    }
  }

  /* --------------------------------- 회원가입 함수 -------------------------------- */
  /**
   *
   * @param authSignUpDto {}
   * @returns
   */
  async signUp(authSignUpDto: AuthSignUpDto) {
    console.log('authSignUpDto', authSignUpDto);
    const user = await this.userRepository.createUser(authSignUpDto);
    return user;
  }
}
