import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  // app.use(morgan('dev'));
  // Swagger
  const config = new DocumentBuilder()
  .setTitle('Exam Manager')
  .setDescription('The Exam Manager APIs')
  .setVersion('1.0')
  .addTag('exams')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port 3000`);
}
bootstrap();