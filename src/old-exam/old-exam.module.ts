import { Module } from '@nestjs/common';
import { OldExamService } from './old-exam.service';
import { OldExamController } from './old-exam.controller';
import { oldExamProviders } from './old-exam.provider';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/utils/multer.config';

@Module({
  controllers: [OldExamController],
  providers: [OldExamService, ...oldExamProviders],
  imports: [
    MulterModule.register(multerOptions)
  ]
})
export class OldExamModule {}
