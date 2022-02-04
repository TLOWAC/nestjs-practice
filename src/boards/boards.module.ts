import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { BoardsController } from './boards.controller';
import { BoardRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {
  /**
   * NOTE: AuthGuard 를 사용하지 않고 아래와 같이 Middleware 를 사용하는 방식으로도 구현이 가능하다.
   * 이 경우에는 `NestMiddleware` 를 추상화하여( implements ) `AuthMiddleware` 를 따로 제작 해줘야한다.
   */
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply('AuthMiddle')
  //     .forRoutes({ path: 'boards', method: RequestMethod.GET });
  // }
}
