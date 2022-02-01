import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  /**
   *  whitelist
   * : DTO 에 정의되지 안은 값은 필터링되며 사용자가 값을 입력하였더라도 API 에서는 이를 필터링한다.
   *
   * forbidNonWhitelisted
   * : DTO 에 정의되어 있지 않은 값이 존재하는 경우 에러를 발생시킵니다.
   *
   * transform
   * : 각종 request 요청을 (json) DTO 로 변환합니다.
   *
   * disableErrorMessages
   * : 에러가 발생하였을때 에러 메시지의 표시 여부를 설정합니다.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3030, () => {
    logger.log('server running on http://localhost:3030');
  });
}
bootstrap();
