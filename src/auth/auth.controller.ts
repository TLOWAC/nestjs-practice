import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredntialDto: AuthCredentialDto) {
    const user = this.authService.signUp(authCredntialDto);
    return user;
  }

  @Post('/signin')
  signIn(
    @Body() authCredntialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const user = this.authService.signIn(authCredntialDto);
    return user;
  }
}
