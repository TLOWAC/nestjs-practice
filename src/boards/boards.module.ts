import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
