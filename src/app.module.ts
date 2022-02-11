import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from './@common/libs/core.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BoardsModule,
    MailModule,
    CoreModule,
  ],
})
export class AppModule {}
