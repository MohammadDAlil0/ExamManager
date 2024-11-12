import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { examProviders } from './exam.provider';

@Module({
  providers: [ExamService, ...examProviders],
  controllers: [ExamController]
})
export class ExamModule {}
