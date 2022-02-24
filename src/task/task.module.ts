import { Module } from '@nestjs/common';

import { TaskService } from './scheduler.service';

@Module({
  imports: [],
  providers: [TaskService],
})
export class TaskModule {}
