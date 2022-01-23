import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BoardsModule } from './boards/boards.module';

async function bootstrap() {
  const app = await NestFactory.create(BoardsModule);
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

  await app.listen(3306, () => {
    logger.log('server running on http://localhost:3306');
  });
}
bootstrap();
