import { NestFactory } from '@nestjs/core';
import {
  AppModule,
  ObserveInstrument,
} from './app.module.js'
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT ?? 4000;
  const host = 'http://localhost';

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.use(cookieParser());

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin:
      process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Expense Web Tracker')
    .setDescription(
      'REST API for tracking expenses.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log('');
  console.log('==========================================');
  console.log('Expense Web Tracker API');
  console.log('==========================================');
  console.log(` App:     ${host}:${port}/api`);
  console.log(
    ` SwaggerApi: ${host}:${port}/api/docs`,
  );
  console.log('==========================================');
  console.log('');
}

bootstrap();
