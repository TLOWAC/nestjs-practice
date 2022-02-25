import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environment, validationEnvSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: validationEnvSchema,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
