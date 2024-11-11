import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/utils/multer.config';
import { examProviders } from './exam.provider';

@Module({
  providers: [ExamService, ...examProviders],
  controllers: [ExamController],
  imports: [
    MulterModule.register(multerOptions)
  ]
})
export class ExamModule {}
