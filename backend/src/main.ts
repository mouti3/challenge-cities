import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join } from 'path/win32';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cities Management API')
    .setDescription('API for managing cities')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const outputPath = join(process.cwd(), 'openapi.json');

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  await writeFile(outputPath, JSON.stringify(document, null, 2));
}
bootstrap();
