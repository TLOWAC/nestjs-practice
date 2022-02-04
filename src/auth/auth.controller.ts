import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
  // @UseGuards(AuthGuard())
  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('req', user);
  }
}
