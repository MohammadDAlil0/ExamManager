import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as morgan from 'morgan';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { SequelizeExceptionFilter } from 'src/core/filters/unique-constraint-error.filter';
import { CustomResponseInterceptorDevelopment, CustomResponseInterceptorProduction } from './core/interceptors/custom.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new SequelizeExceptionFilter());
  if (process.env.NODE_ENV === 'production') {
    app.useGlobalInterceptors(new CustomResponseInterceptorProduction());
  }
  else {
    app.useGlobalInterceptors(new CustomResponseInterceptorDevelopment());
  }
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  // app.use(morgan('dev'));
  // Swagger
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Exam Manager')
  .setDescription('The Exam Manager APIs')
  .setVersion('1.0')
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config, {
    autoTagControllers: true 
  });
  SwaggerModule.setup('api', app, documentFactory);
  app.enableVersioning({
    type: VersioningType.URI
  })


  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port 3000`);
}
bootstrap();