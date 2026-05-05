import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join } from 'path/win32';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Cities Management API')
    .setDescription('API for managing cities')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const outputPath = join(process.cwd(), 'openapi.json');

  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  await writeFile(outputPath, JSON.stringify(document, null, 2));
}
bootstrap();
