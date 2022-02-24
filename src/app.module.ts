import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from './@common/libs/core.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { MailModule } from './mail/mail.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    BoardsModule,
    MailModule,
    CoreModule,
    TaskModule,
  ],
})
export class AppModule {}
