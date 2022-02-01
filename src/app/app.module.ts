import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, BoardsModule],
})
export class AppModule {}
