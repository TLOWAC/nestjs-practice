import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('* * * * * *')
  handleCron() {
    this.logger.debug('Called When the current second is 45');
  }

  /* -------------------------------- 블랙리스트 등록 -------------------------------- */

  /* ------------------------------ 운영 관련 데이터 추출 ------------------------------ */
}
