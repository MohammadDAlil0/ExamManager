import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer.config';

@Module({
  providers: [ExamService],
  controllers: [ExamController],
  imports: [
    MulterModule.register(multerOptions)
  ]
})
export class ExamModule {}
